#!/usr/bin/env node
/**
 * Mints `data-lg-key` into JSX host elements, in place.
 *
 * WHY BABEL AND NOT A SCANNER. A regex pass cannot tell a JSX tag from TypeScript generic
 * syntax — `FieldPath<TFieldValues>` is lexically an opening tag — nor from a tag-shaped
 * string literal. An Elixir scanner tried and corrupted both in the go-react template, so
 * this parses instead. See lib/logen/preview/key_minter.ex.
 *
 * WHY NO @babel/generator. Regenerating from the AST would reformat entire files and bury
 * the key insertion in thousands of lines of noise in the user's diff. We use the parser
 * only for POSITIONS, then splice strings right-to-left so every other byte is untouched.
 *
 * HOST ELEMENTS ONLY. `<div>` yes, `<Card>` no. React's types allow arbitrary `data-*` on
 * intrinsic elements, but a custom component that declares its props rejects an unknown
 * one — and the template builds with `tsc --noEmit`, so tagging components would turn a
 * preview feature into a failed build.
 *
 * Usage:  node mint_keys.cjs <file-or-dir>...   (cwd must resolve @babel/parser)
 * Output: one JSON object on stdout.
 *
 * Directories are walked for .tsx/.jsx, so the caller passes one path rather than an argv
 * of every file, which would otherwise grow past the command-length limit on a large app.
 */
const fs = require("fs");
const crypto = require("crypto");

// Resolve Babel from the WORKING DIRECTORY, not from this script's location. The script is
// dropped somewhere in /app while the dependency lives in /app/frontend/node_modules, which is
// not on the script's own resolution path.
let parser, traverse;
const fromCwd = (m) => require(require.resolve(m, { paths: [process.cwd()] }));
try {
  parser = fromCwd("@babel/parser");
  traverse = fromCwd("@babel/traverse").default;
} catch (e) {
  process.stdout.write(JSON.stringify({ error: "babel_unavailable", detail: String(e.message) }));
  process.exit(0);
}

const ATTR = "data-lg-key";
const KEY_RE = /^[a-z0-9]{6,32}$/;            // must match Logen.Preview.Resolver's @key_format
const seen = new Set();

const mint = () => {
  let k;
  do { k = crypto.randomBytes(5).toString("hex"); } while (seen.has(k));
  return k;
};

// Lowercase JSXIdentifier = intrinsic DOM element. Member expressions (<Foo.Bar>) and
// capitalised names are components; see the header.
const isHostElement = (opening) =>
  opening.name &&
  opening.name.type === "JSXIdentifier" &&
  /^[a-z][a-z0-9-]*$/.test(opening.name.name);

const existingKey = (opening) => {
  for (const a of opening.attributes || []) {
    if (a.type === "JSXAttribute" && a.name && a.name.name === ATTR) {
      const v = a.value;
      if (v && v.type === "StringLiteral" && KEY_RE.test(v.value)) {
        return { key: v.value, start: v.start + 1, end: v.end - 1 };
      }
      return { key: null, start: null, end: null };   // malformed — treat as absent
    }
  }
  return null;
};

const result = { files: 0, minted: 0, deduped: 0, skipped: [], error: null };

const IGNORE = new Set(["node_modules", "dist", "build", ".git", ".logen"]);

// Sorted, depth-first: "the first occurrence keeps the key" must be deterministic across
// runs, or a re-sweep could hand a key to the other twin and invalidate good refs.
const collect = (p, out) => {
  let st;
  try { st = fs.statSync(p); } catch { return out; }
  if (st.isDirectory()) {
    if (IGNORE.has(require("path").basename(p))) return out;
    for (const e of fs.readdirSync(p).sort()) collect(require("path").join(p, e), out);
  } else if (/\.(tsx|jsx)$/.test(p)) {
    out.push(p);
  }
  return out;
};

const targets = [];
for (const arg of process.argv.slice(2).sort()) collect(arg, targets);

for (const file of targets) {
  let src;
  try {
    src = fs.readFileSync(file, "utf8");
  } catch (e) {
    result.skipped.push({ file, reason: "unreadable" });
    continue;
  }

  let ast;
  try {
    ast = parser.parse(src, {
      sourceType: "module",
      plugins: ["jsx", "typescript", "decorators-legacy", "classProperties"],
      errorRecovery: false,
    });
  } catch (e) {
    // A file we cannot parse is a file we must not touch.
    result.skipped.push({ file, reason: "parse_error", detail: e.message.slice(0, 120) });
    continue;
  }

  const edits = [];   // {start, end, text} — applied right-to-left
  traverse(ast, {
    JSXOpeningElement(path) {
      const node = path.node;
      if (!isHostElement(node)) return;

      const found = existingKey(node);
      if (found && found.key) {
        if (seen.has(found.key)) {
          // Copy-paste: the earlier occurrence keeps the identity, this one is re-minted.
          const k = mint();
          seen.add(k);
          edits.push({ start: found.start, end: found.end, text: k });
          result.deduped++;
        } else {
          seen.add(found.key);
        }
        return;
      }
      const k = mint();
      seen.add(k);
      // Insert immediately after the element name, before any attributes.
      edits.push({ start: node.name.end, end: node.name.end, text: ` ${ATTR}="${k}"` });
      result.minted++;
    },
  });

  if (edits.length === 0) continue;

  edits.sort((a, b) => b.start - a.start);
  let out = src;
  for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end);

  try {
    fs.writeFileSync(file, out, "utf8");
    result.files++;
  } catch (e) {
    result.skipped.push({ file, reason: "unwritable" });
  }
}

process.stdout.write(JSON.stringify(result));
