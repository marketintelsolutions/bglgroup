import React from "react";
import About from "../components/Home/About";
import Contact from "../components/Home/Contact";
import Footer from "../components/Home/Footer";
import Headers from "../components/Home/Headers";
import Numbers from "../components/Home/Numbers";

export default function Homepage() {
  return (
    <div className="">
      <Headers />
      <Numbers />
      <Contact />
      <About />
      <Footer />
    </div>
  );
}
