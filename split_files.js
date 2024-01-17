"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var structuringLatexCommands = {
    "\\chapter": 0,
    "\\section": 1,
    "\\subsection":2,
    "\\subsubsection":3

};
var contentLatexCommands = ["\\textbf", "\\textit", "\\enquote"];
var tooComplexXommands = ["\\begin", "\\end"];
function isStructuringLatexCommand(line) {
    return Object.keys(structuringLatexCommands).some(function (command) { return line.startsWith(command); });
}
function getBracketContent(line) {
    var title = line.split("{")[1].split("}")[0];
    return title;
}
function removeContentLatexCommands(line) {
    for (var _i = 0, contentLatexCommands_1 = contentLatexCommands; _i < contentLatexCommands_1.length; _i++) {
        var command = contentLatexCommands_1[_i];
        line = line.replace(command, " ");
    }
    line = line.replace("{", "").replace("}", "");
    return line;
}
function removeUninterestingLatexCommands(line) {
    let buffer="";
  
    for (var i = 0; i < line.length; i++) {
        if (line[i] == "\\") {
            while (  i <line.length&&line.charAt(i) != "}") {
                i++;
            }
            i++;
        }
        else {
            buffer+=line.charAt(i);
           
        }
    }
    if(line.includes("cite")){
        console.log("----")
        console.log(line)
        console.log(buffer)
        console.log("----")
    }
    return buffer;
}
function parseCaption(lines, i,buffer) {
    while(!lines[i].includes("caption")){
        i++;
    }
    let splitted=lines[i].split("=")
    console.log(splitted)
    for(let j=0;j<splitted.length;j++){
        console.log(j)
        if(splitted[j].replace("[","").trim()=="caption"){
            buffer.push(splitted[j+1].replace("{").replace("}").trim())
            return i;
        }
    }
    return i;
}
let counter=0;
let ignorePredicate=(line)=>{return false;}
let ignore=false;
function readPart(lines, filename, level, version, index, title) {
    var buffer = [title];

   for(let i=index;i<lines.length;i++){
        var line = lines[i].trim();
        console.log("CURR LINE",line)
        if(ignore){
            if(ignorePredicate(line)){
                ignore=false;
            }
            console.log("found end")
           
            continue;
        }
        else if (isStructuringLatexCommand(line)) {
            var newTitle = getBracketContent(line);
            var newLevel = structuringLatexCommands[Object.keys(structuringLatexCommands).filter(function (c) { return line.startsWith(c); })[0]];
            var newVersion = increaseVersionAt(version, newLevel);
            var fileNameToWrite = (filename + newTitle).replace(" ", "_").replace("/","_");
            (0, fs_1.writeFileSync)("output/"+JSON.stringify(newVersion)+counter++, buffer.join("\n"));
            console.log(buffer,newVersion)
            if (newLevel == level) {
                return { value: readPart(lines, fileNameToWrite, newLevel, newVersion, i+1, newTitle) };
            }
            else {
                i = readPart(lines, fileNameToWrite, newLevel, newVersion, i+1, newTitle)+1;
            }
        }
        else if(line.startsWith("\\begin{figure}")){
            
           i=parseCaption(lines,i,buffer)
        }
        else if (line.startsWith("\\input")) {
            console.log("input")
            var newFileName = "masterthesis/" + getBracketContent(line);
            console.log(newFileName)
            var newLines = (0, fs_1.readFileSync)(newFileName + ".tex").toString().split("\n");
            var newVersion = Array.from(version);
            readPart(newLines, newFileName.replace("/", "-"), level, newVersion, 0, "");
        }
        else if(line.startsWith("\\begin{")){
            console.log("found begin")
            ignore=true;
            ignorePredicate=(line)=>{return line.startsWith("\\end{");}
        }
        else if (line.startsWith("\\")) {
            
        }
        else {
            line = removeContentLatexCommands(line);
            line=removeUninterestingLatexCommands(line);
            buffer.push(line);
        }
       
    };
   
}
function increaseVersionAt(version, at) {
    var result = Array.from(version);
    for (var i = 0; i < version.length; i++) {
        if (i < at) {
            result[i] = version[i];
        }
        else if (i == at) {
            result[i] = version[i] + 1;
        }
        else {
            result[i] = 0;
        }
    }
    return result;
}
console.log("Start");
let version=Array(Object.keys(structuringLatexCommands).length).fill(0)
console.log(JSON.stringify(version))

var lines = (0, fs_1.readFileSync)("masterthesis/main.tex").toString().split("\n");
readPart(lines, "masterthesis_head", -1, version, 0, "head");
