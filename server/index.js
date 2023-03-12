const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();

const app = express();

const Docrecep = require("./model/docreg");
const Secret = "jwtsecret";
const patient = require("./model/patient");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://Pradeep:coder7976@cluster0.zs3kf.mongodb.net/Receptionist?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongo");
  })
  .catch(() => {
    console.log("Error connecting to Database");
  });

/////////////////////////////////////////////sql start/////////////////////////////////////////////////////////////////////

const Client = require("pg").Pool;

const client = new Client({
  user: "Pradeep7976",
  host: "db.bit.io",
  database: "Pradeep7976/doctor",
  password: "v2_3y55N_exuMZSB6nLzN7jGmL86HrV9",
  port: 5432,
  ssl: true,
});

app.get("/sql", async (req, res) => {
  let idi = 0;
  try {
    const id = await client.query(
      `select * from id order by did desc `,
      (err, result) => {
        if (err) {
          console.log("ERROR FETCHING ID");
        } else {
          idi = result.rows[0].did;
          client.query(`insert into id values($1)`, [idi + 1]);
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
});

/////////////////////////////////////////////////         sql end          /////////////////////////////////////////////////////////////////////

const verifyJwt = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Sorry bro no token");
  } else {
    jwt.verify(token, Secret, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U fail to auth bro " });
        console.log("notauthorised");
      } else {
        console.log("authorsed");
        req.userId = decoded.id;
        next();
      }
    });
  }
};
app.get("/", (req, res) => {
  res.send("Server is not crashed this is msg u have written");
});
app.get("/isUserAuth", verifyJwt, (req, res) => {
  res.json({ auth: true });
});

////////////////////////////////////////////////////          LOGIN          ///////////////////////////////////////////////////////////////
app.post("/plogin", async (req, res) => {
  const email1 = req.body.email;
  const password = req.body.password;
  console.log(email1);
  console.log(password);
  const User = await patient.findOne({ email: email1 });
  // const Passwordcorrect =
  //   User === null ? false : await bcrypt.compare(password, User.password);
  const Passwordcorrect =
    User === null ? false : await bcrypt.compare(password, User.password);
  if (!(User && Passwordcorrect)) {
    // console.log(await bcrypt.compare("traveller", User.password));
    return res.status(401).json({
      error: "invalid email or Password",
    });
  } else {
    const email = User.email;
    try {
      client.query(
        `select pid from patient where email=$1`,
        [email1],
        (err, result) => {
          const token = jwt.sign({ email }, Secret, { expiresIn: 10000 });
          res.json({
            auth: true,
            token: token,
            user: User,
            pid: result.rows[0].pid,
          });
        }
      );
    } catch (err) {
      res.send(err);
    }
  }
});
////////////////////////////////////////////////////          SIGN UP          ///////////////////////////////////////////////////////////////
app.post("/reg", async (req, res) => {
  console.log("Received");

  const saltRounds = 10;
  const username = req.body.username;
  const password = req.body.password;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const email = req.body.email;
  const address = req.body.address;
  const date = req.body.date;
  const Users = await patient.findOne({ email });

  const year = date.toString().slice(0, 4);
  const day = date.toString().slice(5, 7);
  const month = date.toString().slice(8, 10);
  const datee = day + "-" + month + "-" + year;
  const data = {
    username: username,
    password: password,
    email: email,
    address: address,
    date: datee,
  };
  console.log(datee);
  if (Users === null) {
    // if (true) {
    console.log("Request received");
    const dat = new patient({
      email: email,
      password: passwordHash,
    });
    // console.log("date comming" + data.date);
    dat.save();

    /////////////////////////////////       to add to Patients table       //////////////////////////////////////////////////
    try {
      const id = await client.query(
        `select * from id order by pid desc `,
        (err, result) => {
          if (err) {
            console.log("ERROR FETCHING ID");
          } else {
            idi = result.rows[0].did;
            pid = result.rows[0].pid;
            // client.query(`insert into id values($1,$2)`, [idi,pid + 1]);
            client.query(`update id set pid = $1 where pid =$2;`, [
              pid + 1,
              pid,
            ]);
            client.query(`insert into patient values($1,$2,$3,$4,$5)`, [
              pid,
              data.username,
              data.date,
              data.address,
              data.email,
            ]);
          }
        }
      );
    } catch (err) {
      res.send(err);
    }
    //////////////////////////////         adding done           ///////////////////////////////////////////////////////////

    const token = jwt.sign({ email }, Secret, { expiresIn: 800 });
    console.log(token);

    return res.status(200).json({ auth: true, token: token });
  } else {
    res.send({ log: false });
  }
  //

  ///
});

/////////////////////////////////////////////////////////          DOC REGESTER           //////////////////////////////////////////////////

app.post("/docreg", async (req, res) => {
  const data = {
    address: req.body.address,
    email: req.body.email,
    fname: req.body.fname,
    lname: req.body.lname,
    phno: req.body.phno,
    specialization: req.body.specialization,
    yrsofexp: req.body.yrsofexp,
    fee: req.body.fee,
    description: req.body.description,
    gender: req.body.gender.charAt(0),
  };
  try {
    await client.query(
      `select * from id order by did desc `,
      async (err, result) => {
        if (err) {
          console.log("ERROR FETCHING ID");
          res.send();
        } else {
          idi = result.rows[0].did;
          did = result.rows[0].did;
          // client.query(`insert into id values($1,$2)`, [idi,did + 1]);
          client.query(`update id set did = $1 where did =$2;`, [did + 1, did]);
          client.query(
            `select * from doctor where did = $1`,
            [did],
            (err, resu) => {
              if (resu.rows()) {
                console.log("found ");
              }
            }
          );
          await client.query(
            `insert into doctor values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [
              did,
              data.fname,
              data.lname,
              data.specialization,
              data.email,
              data.yrsofexp,
              data.fee,
              data.phno,
              data.description,
              data.gender,
            ]
          );

          data.address.map(async (add) => {
            client.query(
              `insert into adress values($1,$2,$3,$4,$5,$6,$7)`,
              [
                did,
                add.hospital,
                add.street,
                add.city,
                add.cmpltadd,
                add.ftime,
                add.ttime,
              ],
              (err, res) => {
                if (err) {
                  console.log("ADDRESS");
                  console.log(err);
                }
              }
            );
            console.log("DONE UPLOAD");
            return;
          });
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
  // res.send("OK");
  console.log(data);
});
app.get("/del", (req, res) => {
  try {
    client.query(`delete from patient where pid = $1`, [5], (err, resu) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("DONE DELETING");
        res.send("DONE");
      }
    });
  } catch (err) {
    res.send(err);
  }
});
////////////////////////////////////////////////////       ALL DOCTORS         /////////////////////////////////////////////////////////////////

app.get("/doctors", async (req, res) => {
  try {
    await client.query(`select * from doctor`, (err, result) => {
      if (err) {
        console.log("ERROR FETCHING DATA");
      } else {
        res.send(result.rows);
      }
    });
  } catch (err) {
    res.send(err);
  }
});
//////////////////////////////////////////////////      full doctors details   ////////////////////////////////////////////////////////////

app.get("/details/:did", async (req, res) => {
  const did = req.params.did;

  await client.query(
    `select * from doctor where doctor.did = $1`,
    [did],
    (err, result) => {
      if (err) {
        res.status(500).json({ err: "Fetching doctor data err" });
        return;
      } else {
        const doc = result.rows;
        client.query(
          `select * from adress where did = $1`,
          [did],
          (err, result1) => {
            if (err) {
              res.status(500).json({ err: "Fetching time failed" });
            } else {
              res.status(200).json({ doctor: doc, time: result1.rows });
            }
          }
        );
      }
    }
  );
});

//////////////////////////////////////////////////        search doctors      ////////////////////////////////////////////////////////////////

app.post("/search/:city/:spec", (req, res) => {
  const user = req.body.username;
  const city = req.params.city;
  const spec = req.params.spec;
  // try {
  //   client.query(
  //     `select * from doctor join adress on doctor.did=adress.did where adress.city=$1 and doctor.specialization=$2 ;`,
  //     [city, spec],
  //     (err, result) => {
  //       if (err) {
  //         res.send("err");
  //       } else {
  //         res.send(result.rows);
  //         console.log(result.rows);
  //       }
  //     }
  //   );
  // } catch (err) {
  //   res.send(err);
  // }
  try {
    client.query(
      `select distinct doctor.did, doctor.specialization, doctor.fname, doctor.lname, doctor.description ,doctor.yearofexperience  from doctor,adress where doctor.did=adress.did and adress.city=$1 and doctor.specialization=$2 ;`,
      [city, spec],
      (err, result) => {
        if (err) {
          res.send("err");
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
});

app.post("/filter/:city/:spec/:filter/:filterval", (req, res) => {
  const city = req.params.city;
  const spec = req.params.spec;
  const filter = req.params.filter;
  let filterval = req.params.filterval;
  if (filter == "gender") {
    filterval = req.params.filterval.charAt(0);
  }
  try {
    if (filter == "gender") {
      client.query(
        `select distinct doctor.did, doctor.specialization, doctor.fname, doctor.lname, doctor.description ,doctor.yearofexperience  from doctor,adress where doctor.did=adress.did and adress.city=$1 and specialization=$2 and gender=$3 ;`,
        [city, spec, filterval.toUpperCase()],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result.rows);
            console.log(result.rows);
          }
        }
      );
    } else if (filter == "Area") {
      client.query(
        `select distinct doctor.did, doctor.specialization, doctor.fname, doctor.lname, doctor.description ,doctor.yearofexperience  from doctor,adress where doctor.did=adress.did and adress.city=$1 and specialization=$2 and adress.street=$3 ;`,
        [city, spec, filterval],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result.rows);
            console.log(result.rows);
          }
        }
      );
    }
  } catch (err) {
    res.send(err);
  }
});
////////////////////////////////////////////////////      rating         //////////////////////////////////////////////

app.post("/rating", async (req, res) => {
  const did = req.body.did;
  const pid = req.body.pid;
  const rating = req.body.rating;
  const review = req.body.review;
  const data = {
    did: did,
    pid: pid,
    rating: rating,
    review: review,
  };
  try {
    console.log(data);
    await client.query(
      `insert into rating values($1,$2,$3,$4)`,
      [did, rating, review, pid],
      (err, resul) => {
        if (err) {
          console.log(err);
        } else {
          console.log(resul);
        }
      }
    );
    console.log("DONE upload rating");
  } catch (err) {
    res.send(err);
  }
});
app.post("/review", async (req, res) => {
  console.log(req.body.did);
  const did = req.body.did;
  try {
    await client.query(
      `select * from rating where did=$1`,
      [did],
      (err, result) => {
        if (err) console.log(err);
        console.log(result.rows);
        res.send(result.rows);
      }
    );
    // res.send()
  } catch (err) {
    res.send(err);
  }
});
///////////////////////////////////////////////////////////////          get name        ///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////          get name        ///////////////////////////////////////////////////
app.post("/getname", async (req, res) => {
  const pid = req.body.pid;
  console.log(pid + " sdfsdf");
  try {
    await client.query(
      `select * from patient where pid=$1`,
      [pid],
      (err, result) => {
        if (err) console.log(err);
        console.log(result.rows[0].username);
        res.send(result.rows[0].username);
      }
    );
    // res.send()
  } catch (err) {
    res.send(err);
  }
});

///////////////////////////////////////////////////////////////          get name        ////////////////////////////////
app.get("/deletedoc", (req, res) => {
  const email = req.body.username;
  console.log(email);
  Docrecep.deleteMany({ username: email }).then((result) => {
    res.send("done");
  });
});
app.get("/android", (req, res) => {
  res.send("Congo Bro");
});
////////////////////////////////////////////////////////////////      image storage         /////////////////////////////////////////////////////////////////////////////////////////
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now + file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("testImage");

/////////////////////////////////////////////////////////////////////         Image storage           ////////////////////////

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new imageModel({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: "image/png",
        },
      });
      newImage
        .save()
        .then(() => res.send("DONE UPLOAD"))
        .catch((e) => {
          console.log("ERROR UPLOAD");
        });
    }
  });
});
app.get("/getupload", (req, res) => {
  imageModel.find({ name: "testImage" }, (err, data) => {
    res.send(data);
  });
});

const imageModel = require("./model/Image_model");
app.get("/upload", (req, res) => {
  res.send("UPLOAD IMAGE");
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(7000 || process.env.PORT, function () {
  console.log(`Server started on port 7000 `);
  console.log(`Server started on port ${process.env.PORT} `);
});
