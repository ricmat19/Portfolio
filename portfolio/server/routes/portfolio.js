const express = require('express');
const router = express.Router();
const db = require("../db/index");

router.get('/projects', async (req, res) => {

    try{
        const portfolio = await db.query("SELECT * FROM projects", function (err, result, fields) {
            if (err) throw err;

            res.status(200).json({
                status: "success",
                results: result,
                data:{
                    skills: result,
                }
            })
        });
    }catch(err){
        console.log(err);
    }
})

router.post('/projects/add-project', async (req, res) => {
    try{

        const currentProjects = await db.query("SELECT project FROM projects");

        let uniqueProject = true;
        for(let i = 0; i< currentProjects.length; i++){
            if(currentProjects[i] === req.body.project){
                uniqueProject = false;
            }
        }

        let project = 0;
        if(uniqueProject === true){
            project = await db.query(`INSERT INTO projects (project, thumbnail) VALUES (?, ?)`, [req.body.project, req.body.thumbnail]);

            for(let i = 0; i < req.body.projectTech.length; i++){
                project = await db.query(`INSERT INTO project_tech (project, technology) VALUES (?, ?)`, [req.body.project, req.body.projectTech[i]]);
            }

            res.status(201).json({
                status: "success",
                results: skill.rows,
                data:{
                    skill: skill.rows,
                }
            })
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = router;