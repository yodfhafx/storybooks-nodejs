const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// Stories Index
router.get('/', (req, res) => {
  res.render('stories/index');
});

// Add Story Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

// Process Add Story
router.post('/', (req, res) => {
  let allowComments;

  if(req.body.allowComments){
    allowComments = true;
  } else {
    allowComments = false;
  }

  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  }

  // Create Story 
  new Story(newStory)
  .save()
  .then(story => {
    res.redirect(`/stories/show/${story.id}`);
  });
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