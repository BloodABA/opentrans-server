const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('<!DOCTYPE html>\
    <html lang="ko">\
    <head>\
        <meta charset="UTF-8">\
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\
        <meta http-equiv="X-UA-Compatible" content="ie=edge">\
        <title>Opentrans</title>\
    </head>\
    <body>\
        <h1>Opentrans, Hello World!</h1>\
        <div>GITHUB : <a href="https://github.com/BloodABA/opentrans-server">https://github.com/BloodABA/opentrans-server</a></div>\
    </body>\
    </html>')
});

module.exports = router;