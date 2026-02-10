import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import EmailVerify from "./pages/EmailVerify";
import Menubar from "./components/Menubar";

const App = () => {
  return (
    <>
      <Menubar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/email-verify" element={<EmailVerify />}></Route>
      </Routes>
    </>
  );
};

export default App;
