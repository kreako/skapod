import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

if (process.env.NODE_ENV === "development") {
  ;(async () => {
    const mod = await import("./mocks/browser")
    mod.worker.start()
  })()
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
