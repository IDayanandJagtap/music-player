import { ChakraProvider } from "@chakra-ui/react";
import Player from "./components/Player";
import home from "./assets/home.jpeg";

const styles = {
    backgroundImage: `url(${home})`,
    backgroundPosition: "center" /* Center the image */,
    backgroundRepeat: "no-repeat" /* Do not repeat the image */,
    backgroundSize: "cover",
};

export const App = () => {
    return (
        <ChakraProvider>
            <div style={styles}>
                <Player />
            </div>
        </ChakraProvider>
    );
};

export default App;
