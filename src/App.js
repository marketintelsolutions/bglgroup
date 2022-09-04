import logo from "./logo.svg";
import "./App.css";
import Homepage from "./components/Homepage";
import Numbers from "./components/Home/Numbers";
import Contact from "./components/Home/Contact";
import About from "./components/Home/About";
import Footer from "./components/Home/Footer";

function App() {
  return (
    <div className="">
      <Homepage />
      <Numbers />
      <Contact />
      <About />
      <Footer />
    </div>
  );
}

export default App;
