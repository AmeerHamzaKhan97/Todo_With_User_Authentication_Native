const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const upload = multer();

const taskModel = require("./model/TaskModel");
const profileModel = require("./model/ProfileModel");
const userLoginModel = require("./model/UserLoginModel");
const ProfileModel = require("./model/ProfileModel");
const ticketModel = require("./model/PraticeTicketModel");

const app = express();

//
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
// app.use(express.static("public"));
//

app.use(cors());
const PORT = 8080;

app.use(express.json());

// app.use(express.static("public"));

const verify_jwt = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(400).json({ msg: "need a token" });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(400).json({ msg: "failed to auth", err });
      } else {
        req.user = {};
        req.user.id = decoded.id;
        req.user.email = decoded.email;

        next();
      }
    });
  }
};

app.get("/api/v1/user", verify_jwt, async (req, res) => {
  try {
    const user = await userLoginModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    return res.json({
      user: {
        id: user._id,
        email: user.email,
      },
      msg: "Success",
      status: "200",
    });
  } catch (error) {
    res.status(500).json({ error: error.message, status: "500" });
  }
});

app.post("/api/v1/addtask", (req, res) => {
  try {
    // console.log(req.body);
    const { textInput, userId } = req.body;
    const newTask = new taskModel({
      task: textInput,
      userId: userId,
    });

    newTask.save();
    res.status(200).json({ msg: "Task Added" });
  } catch (error) {
    res.status(500).json({ error: error.message, response: "error" });
  }
});

app.get("/api/v1/taskbyid/:id", async (req, res) => {
  // console.log("workinggg...");
  try {
    const allTask = await taskModel.find({ userId: req.params.id });
    res.send(allTask);
  } catch (error) {
    res.status(500).json({ error: error.message, response: "error" });
  }
});

app.get("/api/v1/getbyid/:id", async (req, res) => {
  try {
    const getIdTask = await taskModel.findById({ _id: req.params.id });
    res.send(getIdTask);
  } catch (error) {
    res.status(500).json({ error: error.message, response: "error" });
  }
});

app.put("/api/v1/updatetask/:id", async (req, res) => {
  try {
    // console.log(req.body);
    const { task, userId } = req.body;

    const updateTask = await taskModel.findById({ _id: req.params.id });

    updateTask.task = task;
    updateTask.userId = userId;

    updateTask.save();
    res.json({ msg: "update task done" });
  } catch (error) {
    res.status(500).json({ error: error.message, response: "error" });
  }
});

app.delete("/api/v1/deletetask/:id", async (req, res) => {
  try {
    await taskModel.findByIdAndDelete({ _id: req.params.id });
    res.json({ msg: "Delete" });
  } catch (error) {
    res.status(500).json({ error: error.message, response: "error" });
  }
});

//profile api

app.post("/api/v1/saveprofile", async (req, res) => {
  // console.log(req.body);
  try {
    const { profileImagePath, firstName, lastName, number, email, user_id } =
      req.body;

    // checking duplicate emails
    const existingEmail = await profileModel.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({
        msg: "An Account with this Email already exists",
        response: "error",
      });
    }

    // checking duplicate number
    const existingNumber = await profileModel.findOne({ phone_number: number });
    if (existingNumber) {
      return res.status(400).json({
        msg: "An Account with this Number already exists",
        response: "error",
      });
    }

    // create new profile
    const newProfile = new profileModel({
      profile_picture_path: profileImagePath,
      first_name: firstName,
      last_name: lastName,
      phone_number: number,
      email: email,
      user_id: user_id,
    });
    await newProfile.save();
    res.status(200).json({ msg: "Profile Saved" });
  } catch (error) {
    res.status(500).json({ error: error.message, response: "error" });
  }
});

app.put("/api/v1/updateprofile/:id", async (req, res) => {
  try {
    console.log(req.body);
    // const { task, userId } = req.body;

    await profileModel.updateOne(
      { user_id: req.params.id },
      {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        phone_number: req.body.number,
        profile_picture_path: req.body.profileImagePath,
        user_id: req.body.user_id,
        email: req.body.email,
      }
    );

    // const updateProfile = await profileModel.find({
    //   user_id: req.params.id,
    // });
    // updateProfile[0].first_name = "harry";
    // // updateTask.userId = userId;
    // console.log(updateProfile[0].first_name);
    // console.log(updateProfile);

    // await updateProfile.save();

    res.json({ msg: "update profile done" });
  } catch (error) {
    res.status(500).json({ error: error.message, response: "error" });
  }
});

// signup

app.post("/api/v1/signup", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ msg: "Fill Both the Input", response: "error" });
    }
    // checking duplicate emails
    const existingEmail = await userLoginModel.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({
        msg: "An Account with this Email already exists",
        response: "error",
      });
    }

    // using bcrypt
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create out new user
    const newUserModel = new userLoginModel({
      email: email,
      username: username,

      password: passwordHash,
    });
    // console.log(newUserModel, "new");
    let accessToken = jwt.sign(
      { id: newUserModel._id, email: newUserModel.email },
      process.env.ACCESS_TOKEN_SECRET,

      {
        expiresIn: "24h", // expires in 24 hours
      }
    );
    await newUserModel.save();

    res.status(200).json({
      acessToken: accessToken,
      id: newUserModel._id,
      email: newUserModel.email,
      msg: "Resigter SuccessFull",
      response: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message, response: "error" });
  }
});

app.post("/api/v1/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    //vlaidate
    if (!email || !password) {
      return res.json({
        msg: "Not all field have been entered",
        status: "400",
        response: "error",
      });
    }

    //check email
    const user = await userLoginModel.findOne({ email: email });
    if (!user) {
      return res.json({
        msg: "Invalid credentials email",
        status: "400",
        response: "error",
      });
    }

    //check password and compare with hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        msg: "Invalid credentials password",
        status: "400",
        response: "error",
      });
    }

    let accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,

      {
        expiresIn: "24h", // expires in 24 hours
      }
    );

    return res.json({
      acessToken: accessToken,
      id: user._id,
      email: user.email,

      msg: "Success",
      status: "200",
      response: "success",
    });
  } catch (error) {
    res.json({ error: error.message, status: "500", response: "error" });
  }
});

app.get("/api/v1/getprofile/:id", async (req, res) => {
  try {
    const userProfile = await ProfileModel.find({ user_id: req.params.id });
    if (!userProfile) {
      return res.json({ msg: "No Profile" });
    }
    res.send(userProfile);
  } catch (error) {
    res.json({ error: error.message, status: "500", response: "error" });
  }
});

// start ticket partice api //

app.post("/api/v1/addticket", async (req, res) => {
  // console.log(req.body);
  try {
    const { title, body, userId, read, received } = req.body;
    const newticket = new ticketModel({
      title: title,
      body: body,
      userId: userId,

      received: received,

      read: read,
    });
    await newticket.save();
    res.send("done");
  } catch (error) {
    res.status(500).json({ error: error.message, response: "error" });
  }
});

app.get("/api/v1/getticket/:id", async (req, res) => {
  try {
    const ticketById = await ticketModel.find({ userId: req.params.id });
    if (!ticketById) {
      return res.send("no ticket");
    }
    res.send(ticketById);
  } catch (error) {
    res.status(500).json({ error: error.message, response: "error" });
  }
});

app.get("/api/v1/getnotification/:id", async (req, res) => {
  try {
    const notification = await ticketModel.find({ userId: req.params.id });
    if (!notification) {
      return res.send("no data found");
    }
    const data = notification.filter(
      (receivedvalue) => receivedvalue.received === false
    );

    // console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message, response: "error" });
  }
});

app.put("/api/v1/isreceived/:id", async (req, res) => {
  try {
    const object = await ticketModel.findById({ _id: req.params.id });

    object.received = true;
    await object.save();
    res.send(object);
  } catch (error) {
    res.status(500).json({ error: error.message, response: "error" });
  }
});

// end ticket partice api//

app.listen(PORT, function () {
  console.log(`App listening at http://192.168.0.169:${PORT}`);
});
