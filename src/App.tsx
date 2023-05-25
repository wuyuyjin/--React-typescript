import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import ForgetPassword from "./LoginPage/ForgetPassword";
import Login from './LoginPage/Login';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Register />}></Route> */}
        {/* <Route index element={<Register />}></Route> */}
        {/*<Route path="/ForgetPassword" element={<ForgetPassword />}></Route>*/}
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
