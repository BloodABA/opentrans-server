const App = {}

App.port = 8080
App.client = "https://link.jtj.kr"
App.domain = "https://localhost:8080"
App.mongo = {
    url : "mongodb://localhost/OpenTrans",
    // username : "",
    // password : "" 
}

// 최소 100 LINK
App.minBounty = 100

// 최대 1000000 LINK
App.maxBounty = 1000000

// GMAIL
App.gmailUsername = "opentranse@gmail.com";
App.gmailPassword = "";

// NonLogin page
App.NonLoginPage = [
    {
        method : ["POST", "GET"],
        regex : /^\/account\/.*/
    },
    {
        method : ["GET"],
        regex : /^\/project\//
    },
    {
        method : ["GET"],
        regex : /^\/project\/.*/
    }
]

module.exports = App
