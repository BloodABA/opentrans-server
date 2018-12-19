const Git = require("nodegit");
const fs = require('fs')
const md5 = require('md5');

const baseProject = '../projects'
if(!fs.existsSync(baseProject)) {
    fs.mkdirSync(baseProject)
}

// Stackoverflow
// URL : https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
function getFiles(dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        if(files[i] === ".git") continue;
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

// Document 다운로드
function docsDownload(projectUrl, gitUrl) {
    const projectPath = baseProject + "/" + projectUrl    
    var isExist = fs.existsSync(projectPath)
    
    if(!isExist) {
        fs.mkdirSync(projectPath)
        console.log("Git Clone ...")
        return Git.Clone(gitUrl, projectPath)
    } else {
        return false;
    }
}

// Git PULL
async function docsPull(projectUrl) {
    const projectPath = baseProject + "/" + projectUrl    
    var isExist = fs.existsSync(projectPath)
    if(!isExist) {
        return false;
    } else {
        var repo = await Git.Repository.open(projectPath);
        console.log("Git Pull ...")
        return repo.fetchAll().then(() => {
            return repo.mergeBranches("master", "origin/master");
        })
    }
}

// Document List
function docsList(projectUrl) {
    
    const projectPath = baseProject + "/" + projectUrl    

    if(!fs.existsSync(baseProject)) {
        return false;
    }

    var files = [];
    getFiles(projectPath).forEach(file => {
        files.push({
            path : file.split(baseProject)[1],
            md5 : md5(file.split(baseProject)[1])
        })
    });

    return files;

}

function docRead(projectUrl, hash) {
    let doc = undefined;
    docsList(projectUrl).forEach(file => {
        if(file.md5 === hash) {
            doc = file.path
        }
    })
    if(doc && !doc.endsWith(".md")) {
        doc = undefined;
    }
    if(doc) {
        doc = baseProject + doc
        return fs.readFileSync(doc).toString();
    }
    return doc;
}

function docKeyRead(projectUrl, hash) {
    const text = docRead(projectUrl, hash)
    if(text === undefined) return undefined;
    const rows = []
    text.split(/\r?\n/i).forEach(row => {
        rows.push({
            key : md5(row),
            text : row
        });
    })
    return rows
}

module.exports = {
    docsDownload: docsDownload,
    docsPull: docsPull,
    docsList: docsList,
    docRead: docRead,
    docKeyRead: docKeyRead
}

// const projectUrl = "react-native"
// const gitUrl = "https://github.com/facebook/react-native-website"

// // Document 다운로드
// docsDownload(projectUrl, gitUrl)
// docsPull(projectUrl)

// // Document List
// docs = docsList(projectUrl)

// // Document Read
// doc = docRead(projectUrl, "883718d8872e57a94c4df49d34c034a6")

// // Document Read with hash
// docHash = docKeyRead(projectUrl, "883718d8872e57a94c4df49d34c034a6")
// console.log(docHash);
