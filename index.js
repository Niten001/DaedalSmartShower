const express = require('express');
const app = express();
const parser = require('body-parser');
const bcrypt = require('bcrypt');
// const raspi = require('raspi');
// const Serial = require('raspi-serial').Serial;
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

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src https://api.darksky.net/");
    return next();
});

app.use('/', express.static('./'));

app.get('/', (req, res) => {
    res.redirect('./html/index.html');
});

app.use(parser.urlencoded({ extender: true }));

// app.post('/ControlShower', (req, res) => {
//     raspi.init(() => {
//         var serial = new Serial();
//         serial.open(() => {
//             serial.on('data', (data) => {
//                 res.send(data);
//             });
            // var output;
            // switch (req.body.command) {
            //     case 0: { output = "ÇFd9647\r0"; break; } // get_temp
            //     case 1: { output = "ÇFbt8476\r0"; break; } // Stop
            //     case 2: { output = "ÇFb2501>:=\r0"; break; } // temp_25
            //     case 3: { output = "ÇFb2604;?>\r0"; break; } // temp_26
            //     case 4: { output = "ÇFb27078<?\r0"; break; } // temp_27
            //     case 5: { output = "ÇFb28068?1\r0"; break; } // temp_28
            //     case 6: { output = "ÇFb2905;<0\r0"; break; } // temp_29
            //     case 7: { output = "ÇFb300=668\r0"; break; } // temp_30
            //     default: break;
            // }
//             serial.write(output);
//         });
//     });
// });

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