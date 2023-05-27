import { Outlet } from "react-router-dom";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {Box} from "@chakra-ui/react";

const App = () => {
     const [animationParent] = useAutoAnimate()
     return (
         <Box ref={animationParent}>
         <Outlet />
         </Box>
     )
}

export default App
