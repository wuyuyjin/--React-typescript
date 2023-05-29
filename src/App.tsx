import {Outlet} from "react-router-dom";
import {Box} from "@chakra-ui/react";
import {useAutoAnimate} from "@formkit/auto-animate/react";

const App = () => {
    const [animationParent] = useAutoAnimate()
    return (
        <Box ref={animationParent}>
            <Outlet/>
        </Box>
    )
}

export default App
