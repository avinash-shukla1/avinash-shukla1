type Metadata = { title: string; description: string }

const pages: Record<string, Metadata> = {
  '/projects': { title: 'Projects & case studies', description: 'Explore Avinash Shukla’s frontend and full-stack projects, including real-time messaging and the Tourmates Property Partner work.' },
  '/writing': { title: 'Writing & field notes', description: 'Notes by Avinash Shukla on building thoughtful interfaces, motion on the web, and full-stack development.' },
  '/activity': { title: 'GitHub repositories & activity', description: 'Explore recently pushed public GitHub repositories and recent activity from Avinash Shukla.' },
  '/projects/whatsapp-clone': { title: 'WhatsApp Clone — case study', description: 'Avinash Shukla’s real-time messaging project using Node.js, Express and Socket.io.' },
  '/projects/obys-agency-clone': { title: 'Obys Agency Clone — case study', description: 'An expressive frontend recreation focused on animation and interaction by Avinash Shukla.' },
  '/projects/tourmates-property-partner': { title: 'Tourmates Property Partner — case study', description: 'Property management workflows built during Avinash Shukla’s full-stack internship at Tourmates.' },
  '/projects/q-clay-clone': { title: 'Q Clay Clone — case study', description: 'An animated frontend experiment using JavaScript, GSAP and ScrollTrigger by Avinash Shukla.' },
  '/projects/bookstore-app': { title: 'Bookstore App — case study', description: 'Explore Avinash Shukla’s MERN-stack Bookstore App project.' },
  '/projects/ecommerce-cart': { title: 'E-commerce Cart — case study', description: 'Explore Avinash Shukla’s React-based shopping cart project.' },
  '/writing/building-with-both-sides-in-mind': { title: 'Building with both sides in mind', description: 'A field note by Avinash Shukla on the connection between useful interfaces and reliable backend systems.' },
  '/writing/motion-with-a-purpose': { title: 'Motion with a purpose', description: 'A field note by Avinash Shukla about visual pacing and clarity in web animation.' },
}

function setMeta(attribute: 'name' | 'property', key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = value
}

export function updatePageMetadata(path: string) {
  const page = pages[path] ?? { title: 'Page not found', description: 'This portfolio page could not be found.' }
  const title = `${page.title} | Avinash Shukla`
  document.title = title
  setMeta('name', 'description', page.description)
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', page.description)
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', page.description)
  setMeta('name', 'robots', pages[path] ? 'index, follow' : 'noindex, follow')
}
