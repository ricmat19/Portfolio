import React from "react";
import HeaderC from "./header";
import AboutC from "./about";
import SkillsC from "./skills";
import ProjectsC from "./projects";
import FooterC from "./footer";

const HomeC = () => {
  return (
    <div className="main grid">
      <section id="home" className="grid">
        <div className="home-page-div">
          <div className="grid home-title">
            <div>ricardo</div>
            <div>del cueto</div>
            <a className="resume-div" target="_blank" href="Resume.pdf">
              <button className="resume-button">resume</button>
            </a>
          </div>
          <a href="#about">
            <div className="intro-button">
              <div>see my work</div>
              <i className="down-arrow fas fa-sort-down"></i>
            </div>
          </a>
        </div>
      </section>
      <section id="admin-header">
        <HeaderC />
      </section>
      <section id="admin-about" className="grid">
        <AboutC />
      </section>
      <section id="admin-skills" className="grid">
        <SkillsC />
      </section>
      <section id="admin-portfolio" className="grid">
        <ProjectsC />
      </section>
      <FooterC />
    </div>
  );
};

export default HomeC;
