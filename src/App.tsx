import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./LoginPage/Register";
// import ForgetPassword from "./LoginPage/ForgetPassword";



const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Register />}></Route>
              <Route index element={<Register />}></Route>
              {/*<Route path="/ForgetPassword" element={<ForgetPassword />}></Route>*/}
          </Routes>
      </BrowserRouter>
  )
}

export default App
