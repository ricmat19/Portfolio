import React, { useEffect, useRef, useState } from "react";
import IndexAPI from "../../apis/indexAPI";
import AdminHeaderC from "./header";
import AdminFooterC from "./footer";
import SkillC from "./addSkill";

function importAll(icons) {
  let images = {};
  icons.keys().forEach((icon) => {
    images[icon.replace("./", "")] = icons(icon);
  });
  return images;
}
const skillIcons = importAll(require.context("../../images/skills"));

const AboutC = () => {
  const [skillModal, setSkillModal] = useState("modal");
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);

  const skillRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(skillIcons[`bootstrap-brands.svg`])

        document.addEventListener("mousedown", (event) => {
          if (skillRef.current !== null) {
            if (!skillRef.current.contains(event.target)) {
              setSkillModal("modal");
            }
          }
        });

        //Get all skills from DB
        const skills = await IndexAPI.get(`/skills`);
        const skillArray = [];
        for (let i = 0; i < skills.data.results.length; i++) {
          skills.data.results[i].iconImage =
            skillIcons[skills.data.results[i].icon];
          skillArray.push(skills.data.results[i]);
        }
        skillArray.sort(function (a, b) {
          return a.ranking - b.ranking;
        });
        setSkills(skillArray);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [newSkill]);

  const displaySkillModal = () => {
    setSkillModal("modal modal-active");
  };

  return (
    <div className="main">
      <AdminHeaderC />
      <div className={skillModal}>
        <div ref={skillRef} className="modal-content">
          <SkillC
            skillModal={skillModal}
            setNewSkill={(newSkill) => setNewSkill(newSkill)}
          />
        </div>
      </div>

      <div className="container">
        <div className="title-div">
          <p className="title">about</p>
        </div>
        <div className="about-content-div">
          <div className="profile-div">
            <div className="profile-image-div">
              <img className="profile-image" src="../images/about-image.jpg" />
            </div>
            <div className="info-div">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
                doloribus saepe, incidunt unde atque adipisci sint dignissimos
                dolorum quod provident eligendi! Labore, commodi sit! Quasi
                consequatur mollitia ad odit excepturi!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
                doloribus saepe, incidunt unde atque adipisci sint dignissimos
                dolorum quod provident eligendi! Labore, commodi sit! Quasi
                consequatur mollitia ad odit excepturi!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
                doloribus saepe, incidunt unde atque adipisci sint dignissimos
                dolorum quod provident eligendi! Labore, commodi sit! Quasi
                consequatur mollitia ad odit excepturi!
              </p>
            </div>
          </div>
          <div className="skills-category-container-div">
            <div className="create-skill-div">
              <button onClick={() => displaySkillModal()}>CREATE</button>
            </div>
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
        </div>
      </div>
      <AdminFooterC />
    </div>
  );
};

export default AboutC;
