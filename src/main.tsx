import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

const appReady: Promise<any> = Promise.resolve()

appReady.then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <div>Hello World</div>
  )
})


