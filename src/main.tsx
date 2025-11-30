import { createRoot } from "react-dom/client"
import App from "./App.tsx"
// @ts-expect-error: allow side-effect import of CSS without type declarations
import "./index.css"

const rootElement = document.getElementById("root")
if (rootElement) {
  createRoot(rootElement).render(<App />)
}
