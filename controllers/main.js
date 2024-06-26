//check username and password in post(login) request
//if exist create new JWT
//send back to front-end

const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");

//setup authentication so only the requst with JWT can access the dashboard

const login = async (req, res) => {
  const { username, password } = req.body;
  //mongo validation
  //joi
  //check in the controller

  //just for demo , normally provided by DB
  const id = new Date().getDate();

  //try to keep payload small , better experience for user
  //just for demo , in production use long, complex and unguessable value!!!
  if (!username || !password) {
    throw new BadRequestError("Pleace Provide Emain & Password");
  }

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.ceil(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });

  // const luckyNumber = Math.floor(Math.random()*100)
};

module.exports = { login, dashboard };
