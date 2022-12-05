import { Loader, Navbar } from './components';
import { Suspense, lazy } from 'react'
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import('./routes/Home'))
const Login = lazy(() => import('./routes/Login'))
const Register = lazy(() => import('./routes/Register'))
const ForgotPassword = lazy(() => import('./routes/ForgotPassword'))

function App() {

  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
