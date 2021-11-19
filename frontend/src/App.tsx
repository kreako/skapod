import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { HashRouter, Routes, Route } from "react-router-dom"
// import Home from "./pages/Home"
import Layout from "./pages/Layout"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  )
}
