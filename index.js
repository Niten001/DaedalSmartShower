const express = require('express');
const app = express();
const parser = require('body-parser');
const os = require('os');
const ifaces = os.networkInterfaces();

app.use('/', express.static('./html'));
app.use('/css', express.static('./css'));
app.use('/fonts', express.static('./fonts'));
app.use('/js', express.static('./js'));
app.use('/img', express.static('./img'));
app.use('/db', express.static('./db'));

app.get('/', (req, res) => {
    res.redirect('./index.html');
});

app.use(parser.urlencoded({ extender: true }));

let ipAddr = 'localhost';

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      ipAddr = iface.address;
    } else {
      // this interface has only one ipv4 adress
      ipAddr = iface.address;
    }
    ++alias;
  });
});


app.listen(8080);
console.log('Running on http://' + ipAddr + ':8080');
