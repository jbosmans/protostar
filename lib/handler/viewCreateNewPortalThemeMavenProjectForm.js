"use strict";
var utils = require("../utils");
var url = require("url");

var logger = utils.createLogger({sourceFilePath : __filename});

/**
 *
 * @param {RequestContext} rc
 */
var viewCreateNewPortalThemeMavenProjectForm = function (rc) {
    var wrapper = '<!-- wrap:/ps/backend/layout-help -->\n';
    var editConfigView = rc.runtime.constructAppPath(["core", "backend", "newPortalThemeCompiled.html"]);
    var editConfigContent = rc.runtime.readFile(rc.runtime.constructAppPath(["core", "assets", "newPortalTheme.html"]));
    var helpContent = wrapper + editConfigContent;
    rc.runtime.writeFile(editConfigView, helpContent);
    var composed = rc.composer.composeTemplate(editConfigView, helpContent);
    utils.writeResponse(rc.response, 200, {"Content-Type": "text/html; charset=utf-8"}, composed.content);
};
module.exports = viewCreateNewPortalThemeMavenProjectForm;