/*
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 */
/**
 * Represents main application file.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";

/*jslint unparam: true */

var express = require('express'),
    winston = require('winston'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require("./config.js");

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// stub authentication middleware
app.use(function (req, res, next) {
    req.user = {
        id: config.MOCK_USER_ID
    };

    next();
});

app.use('/saved-searches', require("./controllers/SavedSearches.js"));

// error handler
app.use(function (err, req, res, next) {
    winston.error(err.stack || JSON.stringify(err));
    res.statusCode = err.status || 500;
    res.json({
        status: res.statusCode,
        developerMessage: err.message,
        errorCode: err.errorCode || res.statusCode
    });
});

// Start the server
app.listen(config.API_PORT);
winston.info('Express server listening on port ' + config.API_PORT);