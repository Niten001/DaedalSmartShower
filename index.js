const express = require('express');
const app = express();
const parser = require('body-parser');
const bcrypt = require('bcrypt');
//const raspi = require('raspi');
//const Serial = require('raspi-serial').Serial;
const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'DaedalUserInfo',
    password: 'Y45DqED1Wdim',
    port: '5432'
});
const client = require('mongodb').MongoClient;
const os = require('os');
const ifaces = os.networkInterfaces();

app.use('/', express.static('./'));

app.get('/', (req, res) => {
    res.redirect('./html/index.html');
});

app.use(parser.urlencoded({ extender: true }));

app.post('/ControlShower', (req, res) => {
    raspi.init(() => {
        var serial = new Serial();
        serial.open(() => {
            serial.on('data', (data) => {
                res.send(data);
            });
            serial.write(req.body.command);
        });
    });
});

app.get('/ShowerData', (req, res) => {
    client.connect('mongodb://localhost:27017', (err, db) => {
        if (err) throw err;
        let dbo = db.db('DaedalData');
        dbo.collection('UserData').findOne({}, (err, result) => {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

app.post('/SignIn', function (req, res) {
  pool.query("SELECT passwordHash FROM users WHERE (username = '" + req.body.username + "');", function(err, result) {
      if (err) {
          console.log(err.stack);
      } else {
          if (result.rows[0]) {
              if (bcrypt.compareSync(req.body.password, result.rows[0].passwordhash)) {
                  pool.query("SELECT firstName, lastName, email, username FROM users WHERE (username = '" + req.body.username + "');", function(err, result) {
                      if (err) {
                          console.log(err.stack);
                      } else {
                          res.send({
                              firstName: result.rows[0].firstname,
                              lastName: result.rows[0].lastname,
                              email: result.rows[0].email,
                              username: result.rows[0].username
                          });
                      }
                  });
              } else {
                  res.send({
                      errorMessage: {
                          signInError: "Invalid username or password."
                      }
                  });
              }
          } else {
              res.send({
                  errorMessage: {
                      signInError: "Invalid username or password."
                  }
              });
          }
      }
  });
});

app.post('/SignUp', function(req, res) {
  pool.query("INSERT INTO users VALUES ('" + req.body.username + "', '" + bcrypt.hashSync(req.body.password, 13) + "', '" + req.body.firstName + "', '" + req.body.lastName + "', '" + req.body.email + "');", function(err, result) {
      if (err) {
          if (err.message == 'duplicate key value violates unique constraint "users_pkey"') {
              res.send({
                  errorMessage: {
                      usernameError: "Username already exists. Please use a different username.", 
                  },
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email
              });
          } else {
              console.log(err.stack);
          }
      } else {
          res.send(200);
      }
  });
});

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

/*function crc16_go(text) {
	var ch, i, j;
	//uint16_t good_crc;
	var bad_crc;

	//good_crc = 0xffff;
    bad_crc = 0xffff;
    //bad_crc = 65535;
        i = 0;

        while((ch=(text + i))!= 0)
        {
            //        update_good_crc(ch);
            update_bad_crc(ch, bad_crc);
            i++;
        }

        for (j=4;j>0;j--)
        {
            //(text+i+j-1) = bad_crc % 16 + 0x30;
            bad_crc = bad_crc/16;
    }
    
    // console.log(crc16_go)
}

function update_bad_crc( ch, bad_crc) {
    var i, xor_flag;
    // Why are they shifting this byte left by 8 bits??
    // How do the low bits of the poly ever see it?
    
    ch<<=8;
    for(i=0; i<8; i++)
    {
        if ((bad_crc ^ ch) & 0x8000)
        //if ((bad_crc ^ ch) & 32768)
        {
            xor_flag = 1;
        }
        else
        {
            xor_flag = 0;
        }
        bad_crc = bad_crc << 1;
        if (xor_flag)
        {
            bad_crc = bad_crc ^ 0x1021;
            //bad_crc = bad_crc ^ 4129;
        }
        ch = ch << 1;
    }
}
var output = ['€', 'F', 'i', '0', '0', '0', '0', '\r'];
console.log(crc16_go(output));*/