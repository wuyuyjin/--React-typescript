import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ForgetPassword from './LoginPage/ForgetPassword';
import Login from './LoginPage/Login';
import Register from './LoginPage/Register';
const App = () => {
  // 创建一个路由器·
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
