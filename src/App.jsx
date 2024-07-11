import { useState } from 'react'
import './CSS/App.css'
import './Routes/Route'
import Route from './Routes/Route'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Route/>
    </>
  )
}

export default App
