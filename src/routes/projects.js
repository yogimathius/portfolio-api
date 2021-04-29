const router = require("express").Router();

module.exports = (db, projects) => {
  router.get("/projects", (req, res) => {
    console.log("ping on projects");
    db.query(
      `
        SELECT projects.id, title, text_body, project_url, image_url
        FROM projects
        JOIN projectImages ON projects.id = project_id;
      `
    )
      .then((data) => {
        console.log(data);
        res.json(data.rows);
      })
      .catch((err) => {
        // console.log("bad juju on projects DB", err);
        res.status(500).send("bad juju on projects DB");
      });
  });

  router.get("/projectTitles", (req, res) => {
    console.log("ping on projects");
    db.query(
      `
        SELECT projects.id, title
        FROM projects;
      `
    )
      .then((data) => {
        // console.log(data);
        res.json(data.rows);
      })
      .catch((err) => {
        // console.log("bad juju on projects DB", err);
        res.status(500).send("bad juju on projects DB");
      });
  });


  router.put("/projects", (req, res) => {
    console.log("req.body: ", req.body);
    const { updatedproject } = req.body;
    const { projectId, title, text_body, call_to_action } = updatedproject;
    console.log(projectId, title, text_body);
    const params = [projectId, title, text_body, call_to_action];
    db.query(
      'UPDATE projects SET title = $2, text_body = $3, project_url = $4 WHERE id = $1 returning *;',
      params)
      .then((data) => {
        console.log("success in update projects! ", data);
        res.json(data.rows)
      })
      .catch((err) => {
        console.log("bad juju on update projects DB", err);
        res.status(500).send("bad juju on update projects DB");
      });
  });

  return router;
};
