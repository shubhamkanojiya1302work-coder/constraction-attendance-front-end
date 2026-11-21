// Tiny client-side navigation (there's no router library).
// Paths are app paths like "/sitedesk/records". The Vite base (e.g.
// "/constraction-attendance-front-end" on GitHub Pages) is added/removed here,
// so the rest of the app never deals with it.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

// The current app path, without the base and without a trailing slash.
export function currentPath() {
  const full = window.location.pathname;
  const path = full.startsWith(BASE) ? full.slice(BASE.length) : full;
  return path.replace(/\/+$/, "") || "/";
}

// Go to an app path without reloading the page. Back/Forward keep working
// because App listens for "popstate" (see hooks/usePath).
export function navigate(path) {
  if (path === currentPath()) return;
  window.history.pushState({}, "", BASE + path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}
