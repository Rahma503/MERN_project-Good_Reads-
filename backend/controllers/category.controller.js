const { validationResult } = require("express-validator");
const Category = require("../models/category");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleWare/asyncWrapper");
const appError = require("../utils/appError");

const getAllCategories = asyncWrapper(async (req, res, next) => {
  const categories = await Category.find({}, { __v: false });
  res.json({ status: httpStatusText.SUCCESS, categories });
});

const getCategory = asyncWrapper(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId, { __v: 0 });

  if (!category) {
    return next(appError.create("Category NOT FOUND!", 404, httpStatusText.FAIL));
  }

  res.json({ status: httpStatusText.SUCCESS, category });
});

const addCategory = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
  }

  const newCategory = new Category(req.body);
  await newCategory.save();

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { category: newCategory },
  });
});

const updateCategory = asyncWrapper(async (req, res, next) => {
  const updatedCategory = await Category.findOneAndUpdate(
    { _id: req.params.categoryId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedCategory) {
    return next(appError.create("Category NOT FOUND!", 404, httpStatusText.FAIL));
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {category: updatedCategory },
  });
});

const deleteCategory = asyncWrapper(async (req, res, next) => {
  const category = await Category.findOne({ _id: req.params.categoryId });

  if (!category) {
    return next(appError.create("Category NOT FOUND!", 404, httpStatusText.FAIL));
  }

  await Category.deleteOne({ _id: req.params.categoryId });

  res.json({
    status: httpStatusText.SUCCESS,
    message: "Category deleted successfully",
  });
});

module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
