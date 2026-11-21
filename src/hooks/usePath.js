import { useEffect, useState } from "react";
import { currentPath } from "../utils/navigation";

// The current app path (see utils/navigation). Re-renders on navigate() and on
// the browser's Back/Forward buttons.
export default function usePath() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onChange = () => setPath(currentPath());
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);

  return path;
}
