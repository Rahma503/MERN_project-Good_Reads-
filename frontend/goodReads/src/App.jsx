import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./Cart/BookList";
import Cart from "./Cart/Cart";

function App() {
  const userId = "123"; // Simulated user ID

  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList userId={userId} />} />
        <Route path="/cart" element={<Cart userId={userId} />} />
      </Routes>
    </Router>
  )
}

export default App
