const express = require('express');
const dbProjects = require('..data/helpers/projectModel.js');
const router = express.Router();

router.get('/', (req, res) => {
  dbProjects
    .get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

router.get("/:id"), (req, res) => {
  dbProjects
    .get(req.params.id)
    .then((projectwithActions) => {
      res.status(200).json(projectwithActions);
    })
    .catch((err) => {
      res.status(500),json({ error: "The information could not be retrieved." });
    })
}

router.get("/:id/actions"), (req, res) => {
  dbProjects
    .getProjectActions(req.params.id)
    .then((actionsForProject) => {
      res.status(200).json(actionsForProject);
    })
    .catch((err) => {
      res.status(),json({ error: "The list of actions for the information could not be retrieved." });
    })
}

router.post("/", (req, res) => {
  const newProject = req.body;
  if (
      !newProject.hasOwnProperty("project_id") ||
      !newProject.hasOwnProperty("description") ||
      !newProject.hasOwnProperty("completed")
  ) {
    res.status(400).json({ errorMessage: `"Please provide, ${Project_id}, ${description}, and ${completed} status."` })
  }
  dbProjects
    .insert(newProject)
    .then((createdProject) => {
      res.status(201).json(createdProject);
    })
    .catch((err) => {
      res.status(500).json({ error: "There was an error while saving to the database" })
    });
});

router.delete("/:id", (req, res) => {
  dbProjects
    .remove(req.params.id)
    .then((numOfDeletedProjects) => {
      if(!numOfDeletedProjects) {
        res.status(404).json({ error: "The project with specified ID does not exist"})
      } else {
        res.status(204).end();
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "The project could not be removed" })
    });
});

router.put("/:id", (req, res) => {
  const projectToUpdate = req.body;
  if (
    !projectToUpdate.hasOwnProperty("project_id") ||
    !projectToUpdate.hasOwnProperty("description") ||
    !projectToUpdate.hasOwnProperty("completed")
) {
  res.status(400).json({ errorMessage: `"Please provide, ${Project_id}, ${description}, and ${completed} status."` })
}
  dbProjects
    .update(req.params.id, projectToUpdate)
    .then((updatedProject) => {
      if (!updatedProject) {
        res.status(404).json({ error: "The project with the specified ID does not exist." })
      } else {
        res.status(200).json(updatedProject);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "The information could not be modified."})
    });
  });

  module.exports = router;