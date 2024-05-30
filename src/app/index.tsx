import React from 'react'
import ReactDOM from 'react-dom/client'
import '../config/reset.css'
import {Providers} from "./providers";
import {router} from "./router.tsx";
import {Layout} from "../components/Layout";
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <Providers router={router} />
    </Layout>
  </React.StrictMode>,
)
