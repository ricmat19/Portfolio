import React, { useState } from "react";

const HeaderC = () => {
  const [navbarShow, setNavbarShow] = useState("navbar");

  const displayMenu = () => {
    if (navbarShow === "navbar navbar-show") {
      setNavbarShow("navbar");
    } else {
      setNavbarShow("navbar navbar-show");
    }
  };

  return (
    <div className="header sub-title">
      <div className="hamburger" onClick={() => displayMenu()}>
        <i className="fas fa-bars"></i>
      </div>
      <nav className={navbarShow}>
        <a className="nav-link" href="#home">
          <p>home</p>
        </a>
        <a className="nav-link" href="#about">
          <p>about</p>
        </a>
        <a className="nav-link" href="#skills">
          <p>skills & tools</p>
        </a>
        <a className="nav-link" href="#portfolio">
          <p>projects</p>
        </a>
        <a className="nav-link" href="#contact">
          <p>contact</p>
        </a>
      </nav>
    </div>
  );
};

export default HeaderC;
