import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

function prepare() {
  if (process.env.NODE_ENV === "development") {
    return (async () => {
      const mod = await import("./mocks/browser")
      return mod.worker.start()
    })()
  }
  return Promise.resolve()
}

prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  )
})
