import React from "react";
import pdf from "../assets/annual.pdf";

const Annual = () => {
  return (
    <div className="h-[100vh]">
      <embed src={pdf} type="application/pdf" className="h-full w-full" />
    </div>
  );
};

export default Annual;
