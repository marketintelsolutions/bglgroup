import React from "react";
import pdf from "../assets/file.pdf";

const Egm = () => {
  return (
    <div className="h-[100vh]">
      <embed src={pdf} type="application/pdf" className="h-full w-full" />
    </div>
  );
};

export default Egm;
