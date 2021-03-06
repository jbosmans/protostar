"use strict";
var utils = require("../../utils");
/**
 *
 * @param {RequestContext} rc
 */
module.exports=function (rc) {
    utils.setLoggingLevel("debug");
    return {
        status: 302,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Location": "/"
        }
    };
};
module.exports.label = 'Enable Debug Logging';
module.exports.description = 'Enables more debug logging to console';