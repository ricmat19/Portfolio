const express = require("express");
const router = express.Router();
const db = require("../db/index");

router.get("/projects", async (req, res) => {
  try {
    db.query(
      "SELECT * FROM project_images; SELECT * FROM project_tech; SELECT * FROM projects;",
      function (err, result) {
        if (err) throw err;
        res.status(200).json({
          status: "success",
          results: result,
          data: {
            skills: result,
          },
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.post("/projects/add-project", async (req, res) => {
  try {
    const currentProjects = await db.query("SELECT project FROM projects");

    let uniqueProject = true;
    for (let i = 0; i < currentProjects.length; i++) {
      if (currentProjects[i] === req.body.project) {
        uniqueProject = false;
      }
    }

    if (uniqueProject === true) {
      db.query(`INSERT INTO projects (project) VALUES (?)`, [req.body.project]);

      for (let i = 0; i < req.body.thumbnails.length; i++) {
        if (req.body.thumbnails[i] === req.body.primaryImage) {
          db.query(
            `INSERT INTO project_images (project, thumbnail, primary_image) VALUES (?, ?, ?)`,
            [req.body.project, req.body.thumbnails[i], true]
          );
        } else {
          db.query(
            `INSERT INTO project_images (project, thumbnail, primary_image) VALUES (?, ?, ?)`,
            [req.body.project, req.body.thumbnails[i], false]
          );
        }
      }

      for (let i = 0; i < req.body.projectTech.length; i++) {
        db.query(
          `INSERT INTO project_tech (project, technology) VALUES (?, ?)`,
          [req.body.project, req.body.projectTech[i]]
        );
      }

      res.status(201).json({
        status: "success",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/projects/update-project", async (req, res) => {
  try {
    db.query(`UPDATE projects SET project=? WHERE project=?`, [
      req.body.title,
      req.body.oldTitle,
    ]);

    db.query(`DELETE FROM project_images WHERE project=?`, [req.body.title]);

    for (let i = 0; i < req.body.projectFiles.length; i++) {
      if (req.body.projectFiles[i] === req.body.primaryImage) {
        db.query(
          `INSERT INTO project_images (project, thumbnail, primary_image) VALUES (?, ?, ?)`,
          [req.body.title, req.body.projectFiles[i], true]
        );
      } else {
        db.query(
          `INSERT INTO project_images (project, thumbnail, primary_image) VALUES (?, ?, ?)`,
          [req.body.title, req.body.projectFiles[i], false]
        );
      }
    }

    db.query(`DELETE FROM project_tech WHERE project=?`, [req.body.title]);

    for (let i = 0; i < req.body.projectSkills.length; i++) {
      db.query(`INSERT INTO project_tech (project, technology) VALUES (?, ?)`, [
        req.body.title,
        req.body.projectSkills[i],
      ]);
    }

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete a collection item
router.delete("/admin/portfolio/:title/delete", async (req, res) => {
  try {
    db.query("DELETE FROM projects WHERE project=?", [req.params.title]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
