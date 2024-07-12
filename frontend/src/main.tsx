import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from "./styles/GlobalStyles.tsx";
import PullToRefresh from "pulltorefreshjs"

const standalone = window.matchMedia("(display-mode: standalone)").matches

if (standalone) {
  PullToRefresh.init({
    onRefresh() {
      window.location.reload()
    },
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles/>
    <App/>
  </React.StrictMode>
)
