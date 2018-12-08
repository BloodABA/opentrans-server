const App = {}

App.port = 8080
App.client = "https://link.jtj.kr"
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
App.gmailPassword = "opentranse1004";

module.exports = App