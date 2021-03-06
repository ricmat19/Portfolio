import React from "react";

const FooterC = () => {
  return (
    <div className="grid sub-title footer">
      <div className="grid footer-name">
        <div>ricardo </div>
        <div>del cueto</div>
      </div>
      <div></div>
      <div className="grid footer-nav">
        <a
          target="_blank"
          href="https://www.linkedin.com/in/rick-del-cueto-353393131/"
          rel="noreferrer"
        >
          <img className="footer-icon" src="../images/linkedin.svg" />
        </a>
        <a target="_blank" href="https://github.com/ricmat19" rel="noreferrer">
          <img className="footer-icon" src="../images/github.svg" />
        </a>
        <a target="_blank" href="Resume.pdf">
          <img className="footer-icon" src="../images/file.svg" />
        </a>
      </div>
    </div>
  );
};

export default FooterC;
