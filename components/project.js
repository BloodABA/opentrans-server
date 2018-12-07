const JEnum = require('../enum');
const gitCloneOrPull = require('git-clone-or-pull');
const gitLog = require('gitlog');
const Commit = require('../models/commit')
const Project = require('../models/project')

const App = {};

App.updateGitlog = function(idx, func = ()=>{}) {
    gitLog({
            repo:JEnum.projectPath + idx + "/.git",
            number: 99999999999999999999,
            fields: ['hash', 'authorName', 'authorEmail', 'committerDate', 'committerName', 'committerEmail', 'subject', 'body'],
            execOptions: {
                maxBuffer: 99999999999999999999
            }
        }, (error, commits) => {
            Commit.deleteMany({"project" : idx}).then(() => {
                let available = []
                console.log(commits[0]['subject'])
                console.log(commits[0]['committerDate'])
                const lastCommit = {
                    "Message" : commits[0]['subject'],
                    "timestamp" : (new Date(commits[0]['committerDate'])).getTime()
                }
                console.log(lastCommit)
                for(let i=0;i<commits.length;i++) {
                    commits[i]['project'] = idx
                    commits[i]['timestamp'] = (new Date(commits[i]['committerDate'])).getTime()
                    available.push(commits[i])
                }
                Commit.insertMany(available).then(() => {
                    Project.findOne({"idx":idx})
                    .then(proj => {
                        var project = proj.toObject()
                        var projObj = {
                            idx: project.idx,
                            category: project.category,
                            project: project.project,
                            git: project.git,                          
                            lastCommitMessage : lastCommit['Message'],
                            lastCommit : lastCommit['timestamp'],
                            lastPull : Date.now()
                        }
                        console.log(projObj);
                        Project.findOneAndUpdate({"idx":idx}, projObj)
                        .then(()=>{
                            func(true)
                        })
                    })
                })
            });
        }
    );
}

App.gitUpdate = function(idx, git, func = ()=>{}) {
    gitCloneOrPull(git, JEnum.projectPath + idx, (e) => {
        App.updateGitlog(idx, func)
    });
}

module.exports = App;