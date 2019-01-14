const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// Stories Index
router.get('/', (req, res) => {
  res.render('stories/index');
});

// Add Story Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

// Edit Story Form
router.get('/edit', (req, res) => {
  res.render('stories/edit');
});

// Show Story
router.get('/show', (req, res) => {
  res.render('stories/show');
});

module.exports = router;