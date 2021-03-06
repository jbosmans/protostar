"use strict";

var path = require("path");
var fs = require("fs");
var copier = require("../../copier");
var StaticBuilder = require('../../StaticBuilder');
var osTmpdir = require("os-tmpdir");
/**
 *
 * @param {RequestContext} rc
 */
module.exports=function (rc) {
    var ts = new Date().getTime();
    var dirName = path.basename(rc.runtime.constructProjectPath(".")) + "_build_"+ts;
    var targetDir = osTmpdir() + path.sep + dirName;
    var builder = new StaticBuilder({
        runtime : rc.runtime,
        project : rc.project,
        composer :rc.composer,
        targetDir : targetDir,
        ignoreExcludeFromBuild : false //args.ignoreExcludeFromBuild || false
    });
    builder.createZipBuild().then((zipPath, targetDir, dirName) => {
        var buffer = fs.readFileSync(zipPath);
        rc.response.writeHead(200, {
            'Expires': 0,
            'Cache-Control': 'must-revalidate, post-check=0, pre-check=0',
            'Content-Description': 'File Transfer',
            'Content-type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=\"' + dirName+'.zip\"',
            'Content-Transfer-Encoding': 'binary',
            "Content-Length": buffer.length
        });
        rc.response.write(buffer, "binary");
        rc.response.end();
        copier.deleteRecursively(targetDir);
    });

};
module.exports.label = 'Build to ZIP';
module.exports.description = 'Generates a static build of the project and offers the result as a ZIP file download';