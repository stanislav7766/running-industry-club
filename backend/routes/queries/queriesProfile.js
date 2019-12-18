'use strict';
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const Profile = require('../../models/Profile');
const Feedback = require('../../models/Feedback');
const User = require('../../models/User');
const validateProfile = require('../../validation/validateProfile');
const validateRun = require('../../validation/validateRun');
const validateBookedRun = require('../../validation/validateBookedRun');
const { nofeedback, noprofile, nouser } = require('../../constants/constants');
const { calculatedTotals, calcPace } = require('./totalsActivities');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const uploadImage = multer({
  limits: {
    fileSize: 1024 * 1024
  }
});

const getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ 'user.id': req.user.id });
    return !profile ? res.status(404).json(noprofile) : res.json(profile);
  } catch (err) {
    res.status(404).json(noprofile);
  }
};

const getCurrentBookedRuns = async (req, res) => {
  try {
    const profile = await Profile.findOne({ 'user.id': req.user.id });
    return !profile
      ? res.status(404).json(noprofile)
      : res.json(profile.bookedRuns);
  } catch (err) {
    res.status(404).json(noprofile);
  }
};

const setProfile = async (req, res) => {
  const { errors, isValid } = validateProfile(req.body);
  if (!isValid) return res.status(400).json(errors);

  const profileFields = {};
  profileFields.user = {
    id: req.user.id,
    email: req.user.email,
    nickname: req.user.nickname
  };
  profileFields.social = {};

  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.age) profileFields.age = req.body.age;
  if (req.body.name) profileFields.name = req.body.name;
  if (req.body.website) profileFields.social.website = req.body.website;
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  try {
    const profile = await Profile.findOneAndUpdate(
      {
        'user.id': req.user.id
      },
      { $set: profileFields },
      { new: true }
    );
    profile
      ? res.json(profile)
      : new Profile(profileFields).save().then(profile => res.json(profile));
  } catch (err) {
    res.status(404).json(noprofile);
  }
};

const parseImageUpload = (req, res) => uploadImage.single('preview');

const uploadPreviewToCloud = (file, folder) =>
  uploadPreviewHelper(file, folder)
    .then(result => ({
      url: result.url,
      public_id: result.public_id
    }))
    .catch(err => ({
      status: 'error',
      message: err.message
    }));

const uploadPreviewHelper = (image, folder) => {
  const cloudinaryOptions = {
    resource_type: 'image',
    folder: `${process.env.CLOUDINARY_CLOUD_FOLDER}/${folder}`,
    format: 'jpg'
    // async: true //if async - true, image will be loaded but status - pending and cant get url, only public_id
  };
  return new Promise((resolve, reject) =>
    cloudinary.uploader
      .upload_stream(cloudinaryOptions, (err, res) =>
        err ? reject(err) : resolve(res)
      )
      .end(image.buffer)
  );
};

const setRun = async (req, res) => {
  const { errors, isValid } = validateRun(req.body);
  if (!isValid) return res.status(400).json(errors);

  const uploadedPreview = req.file
    ? await uploadPreviewToCloud(req.file, req.user.id)
    : null;

  const feedback = {};
  feedback.text = req.body.feedback;
  feedback.user = {
    id: req.user.id,
    email: req.user.email,
    nickname: req.user.nickname
  };
  const newRun = {
    nameRun: req.body.nameRun,
    date: req.body.date,
    locationRun: req.body.locationRun,
    distance: req.body.distance,
    time: req.body.time,
    pace: calcPace(req.body.distance, req.body.time),
    feedback: req.body.feedback
  };

  if (uploadedPreview && !uploadedPreview.status)
    newRun.runPreview = {
      url: uploadedPreview.url,
      public_id: uploadedPreview.public_id
    };

  try {
    const profile = await Profile.findOne({ 'user.id': req.user.id });
    profile.runs.push(newRun);
    profile.totalsRun = calculatedTotals(profile.runs);

    profile.save().then(profile => res.json(profile));
    if (newRun.feedback != '') new Feedback(feedback).save();
  } catch (err) {
    console.log(err);
    res.status(404).json(noprofile);
  }
};

const setBookedRun = async (req, res) => {
  const { errors, isValid } = validateBookedRun(req.body);
  if (!isValid) return res.status(400).json(errors);
  const bookedRun = {};
  bookedRun.user = {
    id: req.user.id,
    email: req.user.email,
    nickname: req.user.nickname
  };
  bookedRun.distance = req.body.distance;
  bookedRun.nameRun = req.body.nameRun;
  bookedRun.date = req.body.date;
  bookedRun.status = req.body.status;
  bookedRun.locationRun = req.body.locationRun;

  try {
    const profile = await Profile.findOne({ 'user.id': req.user.id });
    if (!profile.bookedRuns) profile.bookedRuns = [];
    profile.bookedRuns.push(bookedRun);
    profile.save().then(profile => res.json(profile));
  } catch (err) {
    res.status(404).json(noprofile);
  }
};

const deleteBookedRun = async (req, res) => {
  try {
    const profile = await Profile.findOne({ 'user.id': req.user.id });
    const removeIndex = profile.bookedRuns
      .map(item => item.id)
      .indexOf(req.params.run_id);
    profile.bookedRuns.splice(removeIndex, 1);
    profile.save().then(profile => res.json(profile));
  } catch (err) {
    res.status(404).json(noprofile);
  }
};

const deleteRun = async (req, res) => {
  let valFeedback = '';
  try {
    const profile = await Profile.findOne({ 'user.id': req.user.id });
    const removeIndex = profile.runs
      .map(item => item.id)
      .indexOf(req.params.run_id);
    valFeedback = profile.runs[removeIndex]['feedback'];
    if (
      profile.runs[removeIndex].runPreview.url &&
      profile.runs[removeIndex].runPreview.public_id
    ) {
      const publicId = profile.runs[removeIndex].runPreview.public_id;
      await cloudinary.uploader.destroy(publicId, (err, res) => {});
    }
    profile.runs.splice(removeIndex, 1);
    profile.save().then(profile => res.json(profile));
    if (valFeedback != '')
      Feedback.findOneAndRemove({ text: valFeedback }).catch(err =>
        res.status(404).json(nofeedback)
      );
  } catch (err) {
    res.status(404).json({ noprofile });
  }
};

const paidBookedRun = async (req, res) => {
  try {
    const profile = await Profile.findOne({ 'user.id': req.user.id });
    const updateIndex = profile.bookedRuns
      .map(item => item.id)
      .indexOf(req.params.run_id);
    profile.bookedRuns[updateIndex].status = 'paid';

    profile.save().then(profile => res.json(profile));
  } catch (err) {
    res.status(404).json(noprofile);
  }
};

const deleteAccount = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ 'user.id': req.user.id });
    if (!feedbacks || !Array.isArray(feedbacks) || feedbacks.length === 0)
      return res.status(404).json(nofeedback);
    await feedbacks.forEach(doc => doc.remove());
    await Profile.findOneAndRemove({ 'user.id': req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ success: true });
  } catch (err) {
    res.status(404).json(nouser);
  }
};

module.exports = {
  getCurrentProfile,
  getCurrentBookedRuns,
  setProfile,
  uploadPreviewHelper,
  parseImageUpload,
  setRun,
  setBookedRun,
  deleteRun,
  deleteBookedRun,
  paidBookedRun,
  deleteAccount
};
