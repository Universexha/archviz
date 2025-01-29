const express = require('express');
const router = express.Router();
const { addProject, getProjects } = require('../controllers/projectController');

router.get('/', getProjects);
router.post('/add', addProject);

module.exports = router;