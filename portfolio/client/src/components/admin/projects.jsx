import React, { useEffect, useState } from "react";
import IndexAPI from "../../apis/indexAPI";
import AddProjectC from "./addProject";

function importAll(projects) {
  let images = {};
  projects.keys().forEach((index) => {
    images[index.replace("./", "")] = projects(index);
  });
  return images;
}
const projectThumbnails = importAll(require.context("../../images/projects"));

const ProjectsC = () => {
  const currentProjectThumbnailArray = [];

  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [titles, setTitles] = useState([]);
  const [, setAllThumbnails] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [skills, setSkills] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const [filteredThumbnails, setFilteredThumbnails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skills = await IndexAPI.get(`/skills`);
        const skillsList = [];
        for (let i = 0; i < skills.data.data.skills.length; i++) {
          skillsList.push(skills.data.data.skills[i].skill);
        }
        setSkills(skillsList);

        //Get all project thumbnails and images from DB
        const projects = await IndexAPI.get(`/projects`);
        setProjects(projects.data.data.skills);

        //Adds all the projects in project_images to the projectThumbnailArray
        const projectThumbnailArray = [];
        Object.keys(projectThumbnails);
        for (let i = 0; i < projects.data.results[0].length; i++) {
          if (
            projectThumbnailArray.indexOf(
              projects.data.results[0][i].thumbnail
            ) === -1
          ) {
            projects.data.results[0][i].module =
              projectThumbnails[projects.data.results[0][i].thumbnail];
            projectThumbnailArray.push(projects.data.results[0][i]);
          }
        }

        //Loops through the projectThumbnailArray
        const projectTitles = [];
        for (let i = 0; i < projectThumbnailArray.length; i++) {
          const tempArray = [];
          //Loops through all data provided from project_images
          for (let j = 0; j < projects.data.results[0].length; j++) {
            //Checks if the current item in project_images pertains to the current project
            if (
              projects.data.results[0][j].project ===
              projectThumbnailArray[i].project
            ) {
              tempArray.push(projects.data.results[0][j]);
            }
          }
          const key = projectThumbnailArray[i].project;
          const tempObject = {};
          tempObject[key] = [tempArray];
          if (projectTitles.indexOf(projectThumbnailArray[i].project) === -1) {
            projectTitles.push(projectThumbnailArray[i].project);
          }
          currentProjectThumbnailArray.push(tempObject);
        }

        //Filters out duplicate project thumbnail objects
        let exists = false;
        const filteredProjectThumbnailArray = [];
        for (let i = 0; i < currentProjectThumbnailArray.length; i++) {
          if (filteredProjectThumbnailArray.length > 0) {
            for (let j = 0; j < filteredProjectThumbnailArray.length; j++) {
              if (
                Object.keys(currentProjectThumbnailArray[i])[0] ===
                Object.keys(filteredProjectThumbnailArray[j])[0]
              ) {
                exists = true;
              }
            }
            if (exists === false) {
              filteredProjectThumbnailArray.push(
                currentProjectThumbnailArray[i]
              );
            }
          } else {
            filteredProjectThumbnailArray.push(currentProjectThumbnailArray[0]);
          }
          exists = false;
        }
        setAllThumbnails(filteredProjectThumbnailArray);

        const primaryThumbnailArray = [];
        for (let i = 0; i < filteredProjectThumbnailArray.length; i++) {
          for (
            let j = 0;
            j <
            filteredProjectThumbnailArray[i][
              Object.keys(filteredProjectThumbnailArray[i])[0]
            ][0].length;
            j++
          ) {
            if (
              filteredProjectThumbnailArray[i][
                Object.keys(filteredProjectThumbnailArray[i])[0]
              ][0][j].primary_image === 1
            ) {
              primaryThumbnailArray.push(
                filteredProjectThumbnailArray[i][
                  Object.keys(filteredProjectThumbnailArray[i])[0]
                ][0][j]
              );
            }
          }
        }

        setTitles(projectTitles);
        setThumbnails(primaryThumbnailArray);
        setFilteredThumbnails(primaryThumbnailArray);

        //Adds all the projects in project_tech to the projectTechArray
        const projectTechArray = [];
        for (let i = 0; i < projects.data.results[1].length; i++) {
          if (
            projectTechArray.indexOf(projects.data.results[1][i].project) === -1
          ) {
            projectTechArray.push(projects.data.results[1][i].project);
          }
        }

        //Loops through the projectArray
        const currentProjectTechArray = [];
        for (let i = 0; i < projectTechArray.length; i++) {
          const tempArray = [];
          //Loops through all data provided from project_tech
          for (let j = 0; j < projects.data.results[1].length; j++) {
            //Checks if the current item in project_tech pertains to the current project
            if (projects.data.results[1][j].project === projectTechArray[i]) {
              tempArray.push(projects.data.results[1][j].technology);
            }
          }
          const key = projectTechArray[i];
          const tempObject = {};
          tempObject[key] = [tempArray];
          currentProjectTechArray.push(tempObject);
        }
        setTechnology(currentProjectTechArray);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const filterProjects = async (skill) => {
    try {
      const techProjects = [];
      for (let i = 0; i < technology.length; i++) {
        const projectsTech = technology[i][Object.keys(technology[i])][0];
        for (let j = 0; j < projectsTech.length; j++) {
          if (projectsTech[j] === skill) {
            techProjects.push(Object.keys(technology[i])[0]);
          }
        }
      }

      const filteredThumbnails = [];
      for (let i = 0; i < techProjects.length; i++) {
        for (let j = 0; j < thumbnails.length; j++) {
          if (techProjects[i] === thumbnails[j].project) {
            filteredThumbnails.push(thumbnails[j]);
          }
        }
      }
      filteredThumbnails.sort((a, b) => {
        return a.id - b.id;
      });
      setFilteredThumbnails(filteredThumbnails);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main grid">
      <AddProjectC open={open} handleClose={handleClose} />
      <div className="container">
        <div className="center">
          <p className="title">projects</p>
        </div>
        <button className="create-button" onClick={() => handleOpen()}>
          Add Project
        </button>
        <div>
          <div className="grid sub-title skill-filters">
            {skills.map((skill, index) => {
              return (
                <div
                  className="skill"
                  key={index}
                  onClick={() => filterProjects(skill)}
                >
                  {skill}
                </div>
              );
            })}
          </div>
        </div>
        <div className="portfolio-thumbnail-div">
          {filteredThumbnails.map((thumbnail, thumbnailIndex) => {
            return (
              <div key={thumbnailIndex}>
                <div className="portfolio-project">
                  <img
                    className="project-thumbnail"
                    src={thumbnail.module.default}
                  />
                  <div className="thumbnail-overlay thumbnail-overlay--blur">
                    <div className="thumbnail-title-div">
                      {titles[thumbnailIndex].toLowerCase()}
                    </div>
                    <div className="grid buttons-div">
                      <div className="tech-used">
                        {projects[2].map((project, index) => {
                          if (thumbnail.project === project.project) {
                            return (
                              <div key={index} className="thumbnail-desc-div">
                                {project.description}
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectsC;
