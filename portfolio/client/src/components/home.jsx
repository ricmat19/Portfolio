import React from "react";
import HeaderC from "./header";
import AboutC from "./about";
import SkillsC from "./skills";
import PortfolioC from "./portfolio";
import ContactC from "./contact";
// import FooterC from "./footer";

const HomeC = () => {
  return (
    <div className="main grid">
      <HeaderC />
      <div className="grid grid-sections">
        <section id="home" className="grid">
          <div className="home-page-div"></div>
        </section>
        <section id="about" className="grid">
          <AboutC />
        </section>
        <section id="skills" className="grid">
          <SkillsC />
        </section>
        <section id="portfolio" className="grid">
          <PortfolioC />
        </section>
        <section id="contact" className="grid">
          <ContactC />
        </section>

        {/* <FooterC /> */}
      </div>
    </div>
  );
};

export default HomeC;
