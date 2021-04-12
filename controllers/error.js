const path = require("path");
const express = require("express");
const rootDir = require("../util/path");

exports.get404 = (req, res, next) => {
  res.status(500).json({
    error: {
      message: "Error with server",
    },
  });
};
