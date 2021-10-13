import React, { useEffect, useRef, useState } from 'react';
import IndexAPI from '../../apis/indexAPI';

const UpdateC = (props) => {

    const [projectFile, setProjectFile] = useState([]);//All Project Image urls
    const [skills, setSkills] = useState([]); //All Skills

    const [title, setTitle] = useState("") //Current Project Name (set initial value though prop)
    const [thumbnails, setThumbnails] = useState([]) //Current thumbnail URL (set initial value though prop)
    const [tech, setTech] = useState([]); //Current project tech (set initial value though prop)
    const [oldTitle, setOldTitle] = useState("");

    const [updatedProject, setUpdatedProject] = useState("") //Fix

    const projectInput = useRef(null);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                setTitle(props.title)
                setOldTitle(props.title)
                console.log(props)
                setProjectFile(props.thumbnails[0][props.title][0][0]['file'])

                if(props.thumbnails === []){
                    setThumbnails([])
                }else{
                    setThumbnails(props.thumbnails[0])
                }

                if(props.tech === []){
                    setTech([])
                }else{
                    setTech(props.tech[0])
                }

                //Get all skills from DB
                const skills = await IndexAPI.get(`/skills`);
                const skillsArray = [];
                for(let i = 0; i < skills.data.results.length; i++){
                    skillsArray.push(skills.data.results[i].skill)
                }
                setSkills(skillsArray);

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [props]);

    const createList = async (value, checked, setList, list) =>{
        try{

            if(list === null){
                if(checked){
                    setList(value);
                }
            }else{
                if(checked){
                    setList(list => [...list, value]);
                }  
            }

            if(!checked){
                setList(list.filter(list => list !== value))
            }

        }catch(err){
            console.log(err);
        }
    }

    const updateProject = async (e) =>{
        e.preventDefault();
        try{

            const response = await IndexAPI.put("/projects/update-project",{
                title,
                thumbnails,
                tech,
                oldTitle,
            });

            projectInput.current.value = "";

            // props.setUpdatedProject(updatedProject)

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="grid add-project-modal">
            <div className="grid toDo-modal-grid">
                <label>TITLE</label>
                <input ref={projectInput} onChange={e => setTitle(e.target.value)} type="text" name="project_title" value={title}/>
            </div>
            <div className="grid project-creation-checkbox-div">
                <div className="grid thumbnail-checkbox-div">
                    <label>THUMBNAIL</label>
                    <div>
                        {projectFile.map((file, index) => {
                            if(projectFile !== undefined){
                                if(projectFile.includes(file)){
                                    return(
                                        <div key={index} className="grid tech-checkbox-list">
                                            <label className="tech-checkbox-label">{file}</label>
                                            <input type="checkbox" name="image" value={file} onChange={e => createList(e.target.value, e.target.checked, setThumbnails, thumbnails)} checked/>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div key={index} className="grid tech-checkbox-list">
                                            <label className="tech-checkbox-label">{file}</label>
                                            <input type="checkbox" name="image" value={file} onChange={e => createList(e.target.value, e.target.checked, setThumbnails, thumbnails)}/>
                                        </div>
                                    )
                                }
                            }else{
                                return(
                                    <div key={index} className="grid tech-checkbox-list">
                                        <label className="tech-checkbox-label">{file}</label>
                                        <input type="checkbox" name="image" value={file} onChange={e => createList(e.target.value, e.target.checked, setThumbnails, thumbnails)}/>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className="grid tech-grid">
                    <label>TECH</label>
                    <div>
                        {skills.map((skill, index) => {
                            // if(tech[props.title] !== undefined){
                            //     if(tech[props.title].includes(skill)){
                            //         return(
                            //             <div key={index} className="grid tech-checkbox-list">
                            //                 <label className="tech-checkbox-label">{skill}</label>
                            //                 <input type="checkbox" name="skill" value={skill} onChange={e => createList(e.target.value, e.target.checked, setTech, tech)} checked/>
                            //             </div>
                            //         )
                            //     }else{
                            //         return(
                            //             <div key={index} className="grid tech-checkbox-list">
                            //                 <label className="tech-checkbox-label">{skill}</label>
                            //                 <input type="checkbox" name="skill" value={skill} onChange={e => createList(e.target.value, e.target.checked, setTech, tech)}/>
                            //             </div>
                            //         )
                            //     }
                            // }else{
                            //     return(
                            //         <div key={index} className="grid tech-checkbox-list">
                            //             <label className="tech-checkbox-label">{skill}</label>
                            //             <input type="checkbox" name="skill" value={skill} onChange={e => createList(e.target.value, e.target.checked, setTech, tech)}/>
                            //         </div>
                            //     )
                            // }
                        })}
                    </div>
                </div>
            </div>
                <div>
                    <button className="form-button" type="submit" onClick={updateProject}>UPDATE</button>
                </div>
        </div>
    )
}

export default UpdateC;