
const express = require('express');
const app = express();
const request = require('request-promise');

app.use(express.static('src'));
function isResourceRequest(url) {
    const ends =  ['html', 'jpeg', 'png', 'js', 'map'];
    for(let i = 0; i < ends.length;i++) {
        if(url.indexOf(`.{ends[i]}`) !== -1) {
            return true;
        }
    }
    return false;
}
app.use(function (req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-type, Authorization, X-Access-Token',
        'Access-Control-Allow-Credentials': true
    });
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.get('/api/movies', (req,res) => {
    request({
        uri: 'http://s3.amazonaws.com/vodassets/showcase.json',
    }).then((body) => {
        res.status(200).send(body).end();
    }).catch((err) => res.status(500).send(err))
});
app.get('/*', (req, res, next) => {
    if(!isResourceRequest(req.url)) {
        res.sendFile(`${__dirname}/src/index.html`);
        return;
    }
    next();
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Go to this link http://localhost:${port}`));
