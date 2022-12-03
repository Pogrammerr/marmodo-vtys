import { Suspense, lazy } from 'react'
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import('./routes/Home'))
const Login = lazy(() => import('./routes/Login'))

function App() {

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  )
}

export default App
