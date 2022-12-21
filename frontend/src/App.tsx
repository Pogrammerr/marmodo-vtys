import { Loader, Navbar } from "./components";
import { Suspense, lazy, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useEagerLogin from "hooks/useEagerLogin";

const Home = lazy(() => import("./routes/Home"));
const Login = lazy(() => import("./routes/Login"));
const Register = lazy(() => import("./routes/Register"));
const ForgotPassword = lazy(() => import("./routes/ForgotPassword"));
const Homework = lazy(() => import("./routes/Homework"))

function App() {
  const location = useLocation()
  useEagerLogin();

  useLayoutEffect(() => {
    setTimeout(() => document.querySelector(":root")!.scrollTo(0, 0), 100);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          {/* TODO: Protect homework route with isAuth */}
          <Route path="/homework/:homeworkId" element={<Homework />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
