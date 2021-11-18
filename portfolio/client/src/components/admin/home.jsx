import React from "react";
import AdminHeaderC from "./header";
import AdminFooterC from "./footer";

const HomeC = () => {
  return (
    <div className="main">
      <AdminHeaderC />
      <div className="home-page-div"></div>
      <AdminFooterC />
    </div>
  );
};

export default HomeC;
