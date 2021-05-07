const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserDetails = require("./models/user-details");
require("dotenv").config();
const Login = require("./models/login.js");
const Polls = require("./models/polls");
const Bets = require("./models/bets");
const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (e) {
    console.log(e);
  }
  console.log("DB connected");
};
db();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Accept, Content-Type ,Authorization"
  );
  next();
});

app.use(cors());

app.get("/get-details", async (req, res) => {
  const response = await UserDetails.findOne({
    wallet_address: req.query.wallet_address.toString(),
  });
  console.log(response, req.query.wallet_address);
  res.send(response);
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body) {
    const response = await Login.findOne({
      user_id: req.body.user_id,
      password: req.body.password,
    }).populate("details");
    console.log(response);
    res.send(response);
  }
});

app.get("/all-polls", async (req, res) => {
  const response = await Polls.find();
  console.log("All polls", response);
  res.send(response);
});

app.post("/insert-poll", async (req, res) => {
  console.log("New poll details", req.body);
  const poll = new Polls({
    poll_id: req.body.poll_id.toString(),
    starting_at: req.body.starting_at.toString(),
  });
  const res1 = await poll.save();

  await UserDetails.updateOne(
    { wallet_address: req.body.wallet_address.toString() },
    {
      $push: {
        polls: { poll_id: req.body.poll_id.toString(), closed: "false" },
      },
    }
  );
  console.log(res1);
});

app.post("/close-poll", async (req, res) => {
  const response = await UserDetails.findOneAndUpdate(
    {
      wallet_address: req.body.wallet_address.toString(),
      "polls.poll_id": req.body.poll_id.toString(),
    },
    { "polls.$.closed": "true" }
  );
  console.log(response);
  res.send(response);
});

app.post("/addbet", async (req, res) => {
  console.log(req.body.id);
  const bet = new Bets({ id: req.body.id });
  const res1 = await bet.save();
  console.log(res1);
});

app.get("/getbet", async (req, res) => {
  const response = await Bets.find();
  console.log(response);
  res.send(response);
});
app.listen(5000, () => {
  console.log("server started");
});
