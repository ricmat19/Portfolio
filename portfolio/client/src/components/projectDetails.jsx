import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IndexAPI from "../apis/indexAPI";
import LeftArrowC from "./leftArrow";
import RightArrowC from "./rightArrow";
import PropTypes from "prop-types";
import { Backdrop, Box, Fade, Modal } from "@mui/material";

function importAll(projects) {
  let images = {};
  projects.keys().forEach((index) => {
    images[index.replace("./", "")] = projects(index);
  });
  return images;
}
const projectThumbnails = importAll(require.context("../images/projects"));

const ProjectDetailsC = (props) => {

  let parameters = useParams();

  const [title, setTitle] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTitle(parameters.project.toLowerCase());

        //Fix: Add Github URL to DB
        setGithubLink(`https://github.com/ricmat19/${parameters.project}`);

        //Get project from DB
        const project = await IndexAPI.get(`/portfolio/${parameters.project}`);

        const projectThumbnailsArray = [];
        //Loops through the array of images associated with this project
        for (let i = 0; i < project.data.results[1].length; i++) {
          //Gets the file name of the current project image
          const projectFile = project.data.results[1][i].thumbnail;

          //Loops through the array of imported images
          for (let j = 0; j < Object.keys(projectThumbnails).length; j++) {
            if (Object.keys(projectThumbnails)[j] === projectFile) {
              projectThumbnailsArray.push(projectThumbnails[projectFile]);
            }
          }
        }
        setThumbnails(projectThumbnailsArray);
        console.log(projectThumbnailsArray);

        const projectTechArray = [];
        //Loops through the array of technology associated with this project
        for (let i = 0; i < project.data.results[0].length; i++) {
          projectTechArray.push(project.data.results[0][i].technology);
        }
        setTechs(projectTechArray);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const slideThumbnailLeft = async () => {
    try {
      if (thumbnailIndex === 0) {
        setThumbnailIndex(thumbnails.length - 1);
      } else {
        let newThumbnail = thumbnailIndex - 1;
        setThumbnailIndex(newThumbnail);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const slideThumbnailRight = async () => {
    try {
      if (thumbnailIndex === thumbnails.length - 1) {
        setThumbnailIndex(0);
      } else {
        let newThumbnail = thumbnailIndex + 1;
        setThumbnailIndex(newThumbnail);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
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
      >
        <Fade 
        in={props.open}
        >
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
              width: "90vw",
            }}
          >
            <div className="project-details-container">
              <div className="title-div">
                <p className="title">{title}</p>
              </div>
              <div className="grid project-details">
                <div className="grid slider-div">
                  <div
                    className="slider-arrow"
                    onClick={() => slideThumbnailLeft()}
                  >
                    <LeftArrowC />
                  </div>
                  <div className="grid project-slide-div">
                    {thumbnails[0] !== undefined ? (
                      <div className="grid image-container">
                        <img
                          className="grid project-image"
                          src={thumbnails[thumbnailIndex].default}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className="slider-arrow"
                    onClick={() => slideThumbnailRight()}
                  >
                    <RightArrowC />
                  </div>
                </div>
                <div className="grid project-tech-div">
                  {techs.map((tech, index) => {
                    return (
                      <button key={index} className="tech-label">
                        {tech}
                      </button>
                    );
                  })}
                </div>
                <div className="text-content-container">
                  <div className="info-container">
                    <div className="sub-title">about the project</div>
                    <div className="info-div">
                      <p></p>
                    </div>
                  </div>
                  <div className="resource-container">
                    <div className="sub-title">Resources</div>
                    <div className="resources-div">
                      <ul>
                        <li>
                          <span className="project-resource">
                            <a
                              href={githubLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Github
                            </a>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

ProjectDetailsC.propTypes = {
  open: PropTypes.boolean,
  handleClose: PropTypes.func,
};

export default ProjectDetailsC;
