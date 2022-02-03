import React, { useEffect, useRef, useState } from "react";
import IndexAPI from "../../apis/indexAPI";
import PropTypes from "prop-types";
import { Backdrop, Box, Fade, Modal } from "@mui/material";

const AddProjectC = (props) => {
  const [projectImages, setProjectImages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [project, setProject] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [primaryImage, setPrimaryImage] = useState("");
  const [projectTech, setProjectTech] = useState([]);

  const projectInput = useRef(null);

  let projectSet = [];
  function importAll(projects) {
    let images = {};
    projects.keys().forEach((index) => {
      images[index.replace("./", "")] = projects(index);
      Object.keys(images).forEach((key) => {
        projectSet.push(key);
        setProjectImages([...new Set(projectSet)]);
      });
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Get all skills from DB
        const skills = await IndexAPI.get(`/skills`);
        const skillsArray = [];
        for (let i = 0; i < skills.data.results.length; i++) {
          skillsArray.push(skills.data.results[i].skill);
        }
        setSkills(skillsArray);

        importAll(require.context("../../images/projects"));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const createList = async (value, checked, setList, list) => {
    try {
      if (list === null) {
        if (checked) {
          setList(value);
        }
      } else {
        if (checked) {
          setList((list) => [...list, value]);
        }
      }

      if (!checked) {
        setList(list.filter((list) => list !== value));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      console.log(project);
      console.log(thumbnails);
      console.log(primaryImage);
      console.log(projectTech);

      await IndexAPI.post("/projects/add-project", {
        project,
        thumbnails,
        primaryImage,
        projectTech,
      });
      projectInput.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Fade in={props.open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            minWidth: "375px",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <div className="grid add-project-modal">
            <div className="grid create-modal-grid">
              <label className="project-title">TITLE</label>
              <input
                ref={projectInput}
                onChange={(e) => setProject(e.target.value)}
                type="text"
                name="project_title"
              />
            </div>
            <div className="grid project-creation-checkbox-div">
              <div className="grid thumbnail-checkbox-div">
                <div className="center">
                  <div className="grid image-checkbox-list">
                    <label className="image-checkbox-label">THUMBNAIL</label>
                    <label className="image-checkbox-label">Selection</label>
                    <label className="image-checkbox-label">Primary</label>
                  </div>
                </div>
                <div>
                  {projectImages.map((image, index) => {
                    return (
                      <div key={index} className="grid image-checkbox-list">
                        <label className="image-checkbox-label">{image}</label>
                        <div>
                          <input
                            type="checkbox"
                            name="image"
                            value={image}
                            onChange={(e) =>
                              createList(
                                e.target.value,
                                e.target.checked,
                                setThumbnails,
                                thumbnails
                              )
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="image"
                            onChange={() => setPrimaryImage(image)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="grid tech-grid">
                <div className="center">
                  <div className="grid tech-checkbox-list">
                    <label className="image-checkbox-label">TECH</label>
                    <label className="image-checkbox-label">Selection</label>
                  </div>
                </div>
                <div>
                  {skills.map((skill, index) => {
                    return (
                      <div key={index} className="grid tech-checkbox-list">
                        <label className="tech-checkbox-label">{skill}</label>
                        <div>
                          <input
                            type="checkbox"
                            name="skill"
                            value={skill}
                            onChange={(e) =>
                              createList(
                                e.target.value,
                                e.target.checked,
                                setProjectTech,
                                projectTech
                              )
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="create-button-div">
              <button
                className="form-button"
                type="submit"
                onClick={createProject}
              >
                CREATE
              </button>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

AddProjectC.propTypes = {
  open: PropTypes.boolean,
  handleClose: PropTypes.func,
};

export default AddProjectC;
