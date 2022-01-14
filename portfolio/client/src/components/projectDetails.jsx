import React, { useEffect, useState } from "react";
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
  // const [title, setTitle] = useState("");
  // const [githubLink, setGithubLink] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [techs, setTechs] = useState([]);
  const [summary, setSummary] = useState("");
  const [website, setWebsite] = useState("");
  const [gitHubRepo, setGitHubRepo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setTitle(parameters.project.toLowerCase());
        console.log(props);
        //Fix: Add Github URL to DB
        // setGithubLink(`https://github.com/ricmat19/${parameters.project}`);

        let project = {};
        //Get project from DB
        if (props.title !== "") {
          project = await IndexAPI.get(`/portfolio/${props.title}`);
        }

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

        const projectTechArray = [];
        //Loops through the array of technology associated with this project
        for (let i = 0; i < project.data.results[0].length; i++) {
          projectTechArray.push(project.data.results[0][i].technology);
        }
        setTechs(projectTechArray);

        for (let i = 0; i < project.data.data.project[2].length; i++) {
          if (project.data.data.project[2][i].project === props.title) {
            console.log(
              project.data.data.project[2][i].project === props.title
            );
            setSummary(project.data.data.project[2][i].summary);
            setWebsite(project.data.data.project[2][i].website);
            setGitHubRepo(project.data.data.project[2][i].github_repo);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props]);

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
        sx={{
          overflowY: "auto",
          overflowX: "hidden"
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
              minWidth: "375px"
            }}
          >
            <div className="project-details-container">
              <div className="project-details">
                <div className="grid slider-div">
                  <div
                    className="slider-arrow"
                    onClick={() => slideThumbnailLeft()}
                  >
                    <LeftArrowC />
                  </div>
                  <div className="project-slide-div">
                    {thumbnails[0] !== undefined ? (
                      <div className="image-container">
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
                      <div key={index} className="tech-label">
                        {tech}
                      </div>
                    );
                  })}
                </div>
                <div className="info-div">
                  <div>
                    <div className="title">{props.title.toLowerCase()}</div>
                  </div>
                  <div className="summary-container">
                    <p className="summary-div">{summary}</p>
                  </div>
                  <div className="resources-container">
                    <div className="sub-section">
                      website
                      <div className="resources-div">
                        <a href={website}>{website}</a>
                      </div>
                    </div>
                    <div className="sub-section">
                      github
                      <div className="resources-div">
                        <a href={gitHubRepo}>{gitHubRepo}</a>
                      </div>
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
  title: PropTypes.string,
  project: PropTypes.array,
  handleClose: PropTypes.func,
};

export default ProjectDetailsC;
