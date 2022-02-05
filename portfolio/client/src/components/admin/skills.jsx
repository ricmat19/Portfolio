import React, { useEffect, useState } from "react";
import AddSkillC from "./addSkill";

const SkillsC = () => {
  const [open, setOpen] = useState(false);
  const [newSkill] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(newSkill);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [newSkill]);

  return (
    <div className="main grid">
      <AddSkillC open={open} handleClose={handleClose} />
      <div className="center skills-title">
        <p className="title">skills & tools</p>
      </div>
      <div className="grid">
        <button className="add-skill-button" onClick={() => handleOpen()}>
          Add Skill
        </button>
      </div>
      <div className="grid sub-title skills-container">
        <div className="icon-container">
          <img className="icon" src="../images/skills/html5.svg" />
          <div>HTML5</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/css3.svg" />
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
          <img className="icon" src="../images/skills/nodejs.svg" />
          <div>NODEJS</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/express.svg" />
          <div>EXPRESS</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/mysql.svg" />
          <div>MYSQL</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/postgresql.svg" />
          <div>POSTRESQL</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/typescript.svg" />
          <div>TYPESCRIPT</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/sass.svg" />
          <div>SASS</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/bootstrap.svg" />
          <div>BOOTSTRAP</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/git.svg" />
          <div>GIT</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/visual-studio-code.svg" />
          <div>VISUAL STUDIO</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/trello.svg" />
          <div>TRELLO</div>
        </div>
        <div className="icon-container">
          <img className="icon" src="../images/skills/krita.png" />
          <div>KRITA</div>
        </div>
      </div>
    </div>
  );
};

export default SkillsC;
