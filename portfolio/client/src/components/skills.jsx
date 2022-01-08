import React, { useEffect, useState } from "react";
// import IndexAPI from "../apis/indexAPI";
// import HeaderC from "./header";
// import FooterC from "./footer";

// function importAll(icons) {
//   let images = {};
//   icons.keys().forEach((icon) => {
//     images[icon.replace("./", "")] = icons(icon);
//   });
//   return images;
// }
// const skillIcons = importAll(require.context("../images/skills"));

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
        // console.log(skillIcons);
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
          <img className="icon" src="../images/skills/html5.svg" />
          <div>HTML5</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="../images/skills/css3.svg"
          />
          <div>CSS3</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/js.svg" />
          <div>JAVASCRIPT</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/react.svg" />
          <div>REACT</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="../images/skills/nodejs.svg"
          />
          <div>NODEJS</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="../images/skills/express.svg"
          />
          <div>EXPRESS</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="../images/skills/mysql.svg"
          />
          <div>MYSQL</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="../images/skills/postgresql.svg"
          />
          <div>POSTRESQL</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="../images/skills/typescript.svg"
          />
          <div>TYPESCRIPT</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/sass.svg" />
          <div>SASS</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="../images/skills/bootstrap.svg"
          />
          <div>BOOTSTRAP</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="../images/skills/git.svg"
          />
          <div>GIT</div>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="../images/skills/visual-studio-code.svg"
          />
          <div>VISUAL STUDIO</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/krita.png" />
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
