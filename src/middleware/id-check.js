"use strict";

module.exports = (req, res, next, id) => {
  if (/^[a-f0-9]{24}$/i.test(id))
    return next();

  let error = { error: "invalid id" };
  res.statusCode = 404;
  res.statusMessage = "Not Found";
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(error));
  res.end();
};
