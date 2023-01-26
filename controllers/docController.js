const asyncHandler = require("express-async-handler");

const Doc = require("../models/docModel");
const User = require("../models/userModel");

// @desc    Get docs
// @route   GET /api/docs
// @access  Private
const getDocs = asyncHandler(async (req, res) => {
  const docs = await Doc.find({ user: req.user.id });

  res.status(200).json(docs);
});

// @desc    Set doc
// @route   POST /api/docs
// @access  Private

const setDoc = asyncHandler(async (req, res) => {
  const { text, url, note, upload, company, category } = req.body;
  console.log(req.body);
  if (!text || !note || !company || !category) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const doc = await Doc.create({
    text: text,
    url: url,
    note: note,
    upload: upload,
    company: company,
    category: category,
    user: req.user.id,
  });

  res.status(200).json(doc);
});

// @desc    Update doc
// @route   PUT /api/docs/:id
// @access  Private
const updateDoc = asyncHandler(async (req, res) => {
  const doc = await Doc.findById(req.params.id);

  if (!doc) {
    res.status(400);
    throw new Error("Doc not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the doc user
  if (doc.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedDoc = await Doc.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedDoc);
});

// @desc    Delete doc
// @route   DELETE /api/docs/:id
// @access  Private
const deleteDoc = asyncHandler(async (req, res) => {
  const doc = await Doc.findById(req.params.id);

  if (!doc) {
    res.status(400);
    throw new Error("Doc not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the doc user
  if (doc.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await doc.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
};
