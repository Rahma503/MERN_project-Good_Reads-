const { validationResult } = require("express-validator");
const Author = require("../models/author");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleWare/asyncWrapper");
const appError = require("../utils/appError");

const getAllAuthors = asyncWrapper(async (req, res, next) => {
  const authors = await Author.find({}, { __v: false });
  res.json({ status: httpStatusText.SUCCESS, authors });
});

const getAuthor = asyncWrapper(async (req, res, next) => {
  const author = await Author.findOne({ authorId: req.params.authorId }, { __v: false });

  if (!author) {
    return next(appError.create("Author NOT FOUND!", 404, httpStatusText.FAIL));
  }

  res.json({ status: httpStatusText.SUCCESS, author });
});

const addAuthor = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
  }

  const newAuthor = new Author(req.body);
  await newAuthor.save();

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { author: newAuthor },
  });
});

const updateAuthor = asyncWrapper(async (req, res, next) => {
  const updatedAuthor = await Author.findOneAndUpdate(
    { authorId: req.params.authorId }, 
    req.body, 
    { new: true, runValidators: true }
  );

  if (!updatedAuthor) {
    return next(appError.create("Author NOT FOUND!", 404, httpStatusText.FAIL));
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { updatedAuthor },
  });
});

const deleteAuthor = asyncWrapper(async (req, res, next) => {
  const author = await Author.findOne({ authorId: req.params.authorId });

  if (!author) {
    return next(appError.create("Author NOT FOUND!", 404, httpStatusText.FAIL));
  }

  await Author.deleteOne({ authorId: req.params.authorId });

  res.json({
    status: httpStatusText.SUCCESS,
    message: "Author deleted successfully",
  });
});

module.exports = {
  getAllAuthors,
  getAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
};
