import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import Showcase from "./components/Showcase";

const App = () => {
    return (
        <main>
            <Navbar />
            <Hero />
            <ProductViewer />
            <Showcase />
        </main>
    );
};

export default App;