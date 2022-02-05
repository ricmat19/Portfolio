import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useParams } from "react-router-dom";
import IndexAPI from "../../apis/indexAPI";
import AdminHeaderC from "./header";
import AdminFooterC from "./footer";
import LeftArrowC from "../leftArrow";
import RightArrowC from "../rightArrow";

function importAll(projects) {
  let images = {};
  projects.keys().forEach((index) => {
    images[index.replace("./", "")] = projects(index);
  });
  return images;
}
const projectThumbnails = importAll(require.context("../../images/projects"));

const ProjectDetailsC = () => {
  const [loginStatus, setLoginStatus] = useState(true);
  const [title, setTitle] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [techs, setTechs] = useState([]);

  let parameters = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);

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

  if (loginStatus) {
    return (
      <div className="main">
        <AdminHeaderC />

        <div className="project-details-container">
          <div className="center">
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
              <div className="grid justify-content">
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
              <div>
                <div className="sub-title">about the project</div>
                <div className="info-div">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Explicabo itaque nulla deleniti aperiam animi rerum atque
                    numquam ex quod inventore rem fugit possimus ab quibusdam
                    vel sint, facere totam omnis? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Veniam velit omnis ducimus in.
                    Aperiam aut possimus ullam consectetur ipsa cumque nesciunt
                    et, quia laborum accusantium iste magni, non minus quod?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, molestiae doloribus cupiditate magni sapiente
                    nostrum voluptatem soluta nisi repellat quae voluptatibus
                    accusantium magnam illo facere fugit maxime distinctio quis
                    officia.
                  </p>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Explicabo itaque nulla deleniti aperiam animi rerum atque
                    numquam ex quod inventore rem fugit possimus ab quibusdam
                    vel sint, facere totam omnis? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Veniam velit omnis ducimus in.
                    Aperiam aut possimus ullam consectetur ipsa cumque nesciunt
                    et, quia laborum accusantium iste magni, non minus quod?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, molestiae doloribus cupiditate magni sapiente
                    nostrum voluptatem soluta nisi repellat quae voluptatibus
                    accusantium magnam illo facere fugit maxime distinctio quis
                    officia.
                  </p>
                </div>
              </div>
              <div className="resources-container">
                <div className="sub-title">Resources</div>
                <div className="resources-div">
                  <ul>
                    <li>
                      <span className="project-resource">
                        <a href={githubLink} target="_blank" rel="noreferrer">
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

        <AdminFooterC />
      </div>
    );
  } else {
    return <Redirect to="/admin/login" />;
  }
};

export default ProjectDetailsC;
