import React, { useEffect, useState } from "react";
// import IndexAPI from "../apis/indexAPI";
// import HeaderC from "./header";
// import FooterC from "./footer";

function importAll(icons) {
  let images = {};
  icons.keys().forEach((icon) => {
    images[icon.replace("./", "")] = icons(icon);
  });
  return images;
}
const skillIcons = importAll(require.context("../images/skills"));

const SkillsC = () => {
  const [newSkill] = useState("");
  // const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Get all skills from DB
        //   const skillArray = [];
        //   for (let i = 0; i < skills.data.results.length; i++) {
        //     skills.data.results[i].iconImage =
        //       skillIcons[skills.data.results[i].icon];
        //     skillArray.push(skills.data.results[i]);
        //   }
        //   skillArray.sort(function (a, b) {
        //     return a.ranking - b.ranking;
        //   });
        //   setSkills(skillArray);
        console.log(skillIcons);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [newSkill]);

  return (
    <div className="main grid">
      <div className="grid skills-container">
        <div className="icon-container">
          <img className="icon" src="/static/media/html5-brands.9d733b4b.svg" />
          <div>HTML5</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/static/media/css3-alt-brands.82c7eb8b.svg"
          />
          <div>CSS3</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="/static/media/js-brands.dc1543fd.svg" />
          <div>JAVASCRIPT</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="/static/media/react-brands.3581e10e.svg" />
          <div>REACT</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/static/media/node-js-brands.53b1451c.svg"
          />
          <div>NODEJS</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/static/media/express-original-wordmark.3365634d.svg"
          />
          <div>EXPRESS</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/static/media/icons8-mysql-logo.de1f441d.svg"
          />
          <div>MYSQL</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/static/media/icons8-postgresql.72b1e0fb.svg"
          />
          <div>POSTRESQL</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/static/media/icons8-mongodb.acfd3543.svg"
          />
          <div>MONGODB</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/static/media/typescript-icon.8d9549db.svg"
          />
          <div>TYPESCRIPT</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="/static/media/sass-brands.ce968b44.svg" />
          <div>SASS</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/static/media/bootstrap-brands.bedaa35c.svg"
          />
          <div>BOOTSTRAP</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/static/media/github-brands.8bce9409.svg"
          />
          <div>GITHUB</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="/static/media/heroku-icon.68909cda.svg" />
          <div>HEROKU</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/static/media/icons8-visual-studio-logo.bee01e54.svg"
          />
          <div>VISUAL STUDIO</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="/static/media/icons8-krita.f15a9f0a.svg" />
          <div>KRITA</div>
        </div>
      </div>

      {/* <HeaderC /> */}
      {/* <div className="container">
          <div className="skills-category-container-div">
            <div className="skill-category-div">
              <div className="sub-title">MARKUP</div>
              <div className="skill-div">
                {skills.map((skill, index) => {
                  if (skill.category === "MARKUP") {
                    return (
                      <div key={index}>
                        <img className="icon" src={skill.iconImage.default} />
                        <div className="icon-label">{skill.skill}</div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="skill-category-div">
              <div className="sub-title">STYLE</div>
              <div className="skill-div">
                {skills.map((skill, index) => {
                  if (skill.category === "STYLE") {
                    return (
                      <div key={index}>
                        <img className="icon" src={skill.iconImage.default} />
                        <div className="icon-label">{skill.skill}</div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="skill-category-div">
              <div className="sub-title">FRONTEND</div>
              <div className="skill-div">
                {skills.map((skill, index) => {
                  if (skill.category === "FRONTEND") {
                    return (
                      <div key={index}>
                        <img className="icon" src={skill.iconImage.default} />
                        <div className="icon-label">{skill.skill}</div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="skill-category-div">
              <div className="sub-title">BACKEND</div>
              <div className="skill-div">
                {skills.map((skill, index) => {
                  if (skill.category === "BACKEND") {
                    return (
                      <div key={index}>
                        <img className="icon" src={skill.iconImage.default} />
                        <div className="icon-label">{skill.skill}</div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="skill-category-div">
              <div className="sub-title">DATABASE</div>
              <div className="skill-div">
                {skills.map((skill, index) => {
                  if (skill.category === "DATABASE") {
                    return (
                      <div key={index}>
                        <img className="icon" src={skill.iconImage.default} />
                        <div className="icon-label">{skill.skill}</div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="skill-category-div">
              <div className="sub-title">OTHER</div>
              <div className="skill-div">
                {skills.map((skill, index) => {
                  if (skill.category === "OTHER") {
                    return (
                      <div key={index}>
                        <img className="icon" src={skill.iconImage.default} />
                        <div className="icon-label">{skill.skill}</div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
      </div> */}
      {/* <FooterC /> */}
    </div>
  );
};

export default SkillsC;
