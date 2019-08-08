const express = require('express');
const app = express();
const parser = require('body-parser');

app.use('/', express.static('./html'));
app.use('/css', express.static('./css'));
app.use('/fonts', express.static('./fonts'));
app.use('/js', express.static('./js'));
app.use('/img', express.static('./img'));

app.get('/', (req, res) => {
    res.redirect('./index.html');
});

app.use(parser.urlencoded({ extender: true }));

app.listen(8080);
console.log('Running on http://localhost:8080');