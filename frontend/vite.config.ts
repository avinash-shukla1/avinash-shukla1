import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The Logen preview embeds this app in an iframe. Vite is the front door, so IT
// must send a CSP that allows framing (mirrors the Phoenix IframeCsp plug).
// DO NOT REMOVE — without it the in-product preview renders blank.
function logenIframeCsp() {
  const csp = "base-uri 'self'; frame-ancestors *;";
  const cacheControl = "private, no-cache";
  type Res = { setHeader: (k: string, v: string) => void };
  type Srv = { middlewares: { use: (fn: (req: unknown, res: Res, next: () => void) => void) => void } };
  const set = (_req: unknown, res: Res, next: () => void) => {
    res.setHeader("Content-Security-Policy", csp);
    res.setHeader("Cache-Control", cacheControl);
    next();
  };
  return {
    name: "logen-iframe-csp",
    configureServer(server: Srv) {
      server.middlewares.use(set);
    },
    configurePreviewServer(server: Srv) {
      server.middlewares.use(set);
    },
  };
}

// Takes the preview key back OUT of a published bundle. `data-lg-key` is minted into this
// app's SOURCE so a preview reference survives edits that move the element; without this
// strip it would also ship to every visitor.
// DO NOT REMOVE — see docs/preview-element-identity.md.
type LgAttr = { type: string; name?: { name?: string } };
type LgJSXPath = { node: { attributes: LgAttr[] } };

function logenStripLgKeys() {
  return {
    name: "logen-strip-lg-keys",
    visitor: {
      JSXOpeningElement(path: LgJSXPath) {
        // Vite sets NODE_ENV=production for `vite build` and development for the dev
        // server. Dev MUST keep the keys — the preview resolves a click through them.
        if (process.env.NODE_ENV !== "production") return;
        path.node.attributes = path.node.attributes.filter(
          (a) => !(a.type === "JSXAttribute" && a.name && a.name.name === "data-lg-key"),
        );
      },
    },
  };
}

// Loads the Logen preview inspector — the in-page half of click-an-element-to-edit.
// `apply: "serve"` keeps it out of published builds; LOGEN_BASE_URL is the brain's origin,
// injected into every container by ProjectEnv.
// DO NOT REMOVE — without it the preview cannot map a click back to source.
function logenPreviewInspector() {
  const base = (process.env.LOGEN_BASE_URL || "").replace(/\/+$/, "");
  return {
    name: "logen-preview-inspector",
    apply: "serve" as const,
    transformIndexHtml() {
      if (!base) return [];
      return [
        {
          tag: "script",
          attrs: { src: base + "/preview/inspector.js", defer: true },
          injectTo: "head" as const,
        },
      ];
    },
  };
}

export default defineConfig({
  plugins: [logenPreviewInspector(), logenIframeCsp(), react({ babel: { plugins: [logenStripLgKeys()] } })],
  server: {
    allowedHosts: true, host: '0.0.0.0', proxy: { '/api': 'http://127.0.0.1:8080' } },
})
