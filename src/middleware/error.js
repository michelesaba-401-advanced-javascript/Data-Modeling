"use strict";

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let error = { error: err };
  console.log(error);
  res.statusCode = err.status || 500;
  res.statusMessage = "Server Error";
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(error));
  res.end();
};
