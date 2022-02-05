import React, { useEffect, useRef, useState } from "react";
import IndexAPI from "../../apis/indexAPI";
import PropTypes from "prop-types";

const UpdateC = (props) => {
  const [, setFiles] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [projectFiles, setProjectFiles] = useState([]);
  const [primaryImage, setPrimaryImage] = useState("");
  const [skills, setSkills] = useState([]);
  const [projectSkills, setProjectSkills] = useState([]);

  const [titles, setTitles] = useState([]);
  const [title, setTitle] = useState("");
  const [, setThumbnails] = useState([]);
  const [, setTech] = useState([]);
  const [oldTitle, setOldTitle] = useState("");

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
        setTitle(props.title);
        setOldTitle(props.title);

        const titlesArray = [];
        for (let i = 0; i < props.thumbnails.length; i++) {
          titlesArray.push(Object.keys(props.thumbnails[i])[0]);
        }
        setTitles(titlesArray);

        importAll(require.context("../../images/projects"));

        //Sets the full list of files
        const filesArray = [];
        for (let i = 0; i < props.thumbnails.length; i++) {
          filesArray.push(props.thumbnails[i][titles[i]][0][0]["thumbnail"]);
        }
        setFiles(filesArray);

        //Sets list of all of the files pertaining to this project
        const projectFilesArray = [];
        for (let i = 0; i < props.thumbnails.length; i++) {
          if (Object.keys(props.thumbnails[i]).toString() === props.title) {
            for (
              let j = 0;
              j < props.thumbnails[i][props.title][0].length;
              j++
            ) {
              projectFilesArray.push(
                props.thumbnails[i][props.title][0][j]["thumbnail"]
              );
            }
          }
        }
        setProjectFiles(projectFilesArray);

        //Get all skills from DB
        const skills = await IndexAPI.get(`/skills`);
        const skillsArray = [];
        for (let i = 0; i < skills.data.results.length; i++) {
          skillsArray.push(skills.data.results[i].skill);
        }
        setSkills(skillsArray);

        //Sets list of all of the files pertaining to this project
        const projectTechArray = [];
        for (let i = 0; i < props.tech.length; i++) {
          if (Object.keys(props.tech[i]).toString() === props.title) {
            for (let j = 0; j < props.tech[i][props.title][0].length; j++) {
              projectTechArray.push(props.tech[i][props.title][0][j]);
            }
          }
        }
        setProjectSkills(projectTechArray);

        if (props.thumbnails === []) {
          setThumbnails([]);
        } else {
          setThumbnails(props.thumbnails[0]);
        }

        if (props.tech === []) {
          setTech([]);
        } else {
          setTech(props.tech[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props]);

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

  const updateProject = async (e) => {
    e.preventDefault();
    try {
      await IndexAPI.put("/projects/update-project", {
        title,
        projectFiles,
        primaryImage,
        projectSkills,
        oldTitle,
      });

      projectInput.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid gap">
      <div className="grid toDo-modal-grid">
        <label>TITLE</label>
        <input
          ref={projectInput}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="project_title"
          value={title}
        />
      </div>
      <div className="grid project-update-checkbox-div">
        <div className="grid thumbnail-checkbox-div">
          <div>
            <label>THUMBNAIL</label>
            <div className="grid image-checkbox-list">
              <label className="align-left"></label>
              <label className="align-left">Selection</label>
              <label className="align-left">Primary</label>
            </div>
          </div>
          <div>
            {projectImages.map((file, index) => {
              if (projectFiles.includes(file)) {
                return (
                  <div key={index} className="grid image-checkbox-list">
                    <label className="align-left">{file}</label>
                    <div>
                      <input
                        type="checkbox"
                        name="image"
                        value={file}
                        onChange={(e) =>
                          createList(
                            e.target.value,
                            e.target.checked,
                            setProjectFiles,
                            projectFiles
                          )
                        }
                        checked
                      />
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="image"
                        onChange={() => setPrimaryImage(file)}
                      />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="grid image-checkbox-list">
                    <label className="align-left">{file}</label>
                    <div>
                      <input
                        type="checkbox"
                        name="image"
                        value={file}
                        onChange={(e) =>
                          createList(
                            e.target.value,
                            e.target.checked,
                            setProjectFiles,
                            projectFiles
                          )
                        }
                      />
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="image"
                        onChange={() => setPrimaryImage(file)}
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="grid tech-grid">
          <div>
            <label>TECH</label>
            <div className="grid tech-checkbox-list">
              <label className="align-left"></label>
              <label className="align-left">Selection</label>
            </div>
          </div>
          <div>
            {skills.map((skill, index) => {
              if (projectSkills.includes(skill)) {
                return (
                  <div key={index} className="grid tech-checkbox-list">
                    <label className="align-left">{skill}</label>
                    <div>
                      <input
                        type="checkbox"
                        name="skill"
                        value={skill}
                        onChange={(e) =>
                          createList(
                            e.target.value,
                            e.target.checked,
                            setProjectSkills,
                            projectSkills
                          )
                        }
                        checked
                      />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="grid tech-checkbox-list">
                    <label className="align-left">{skill}</label>
                    <div>
                      <input
                        type="checkbox"
                        name="skill"
                        value={skill}
                        onChange={(e) =>
                          createList(
                            e.target.value,
                            e.target.checked,
                            setProjectSkills,
                            projectSkills
                          )
                        }
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div>
        <button className="form-button" type="submit" onClick={updateProject}>
          UPDATE
        </button>
      </div>
    </div>
  );
};

UpdateC.propTypes = {
  title: PropTypes.string,
  thumbnails: PropTypes.array,
  tech: PropTypes.array,
};

export default UpdateC;
