import * as React from 'react'
import {ChakraProvider} from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import './index.css'
import App from "./App";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Login from "./LoginPage/Login";
import Register from "./LoginPage/Register";
import ForgetPassword from "./LoginPage/ForgetPassword";
import Home from "./HomePage/Home";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="forgetPassword" element={<ForgetPassword/>}/>
            <Route path="home" element={<Home />} />
        </Route>
    )
)

const rootElement = ReactDOM.createRoot(document.getElementById("root") as Element);
rootElement.render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>,
)