import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./LoginPage/Register";
import ForgetPassword from "./LoginPage/ForgetPassword";
import Login from "./LoginPage/Login";



const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route index element={<Login />}></Route>
              <Route path="/Register" element={<Register />}></Route>
              <Route path="/ForgetPassword" element={<ForgetPassword />}></Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
