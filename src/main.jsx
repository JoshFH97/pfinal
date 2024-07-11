import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './CSS/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GeneralInformation from './Componetes/Home/GeneralInformation.jsx'
import Home from './paginas/Home.jsx'
import ProductSection from './Componetes/product/Articles.jsx'
import ContactSection from './Componetes/Contact/Mensaje.jsx'
import Login from './paginas/loginRegister.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element:<GeneralInformation/>
  },
  {
    path: "/Productos",
    element:<ProductSection/>
  },
  {
    path:"/Contacto",
    element:<ContactSection/>
  },
  {
    path:"/Login",
    element:<Login/>
  }

  
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
