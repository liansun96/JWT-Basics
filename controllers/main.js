//check username and password in post(login) request
//if exist create new JWT
//send back to front-end

const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

//setup authentication so only the requst with JWT can access the dashboard

const login = (req, res) => {
  const { username, password } = req.body;
  //mongo validation
  //joi
  //check in the controller

  //just for demo , normally provided by DB
  const id = new Date().getDate();

  //try to keep payload small , better experience for user
  //just for demo , in production use long, complex and unguessable value!!!
  if (!username || !password) {
    throw new CustomAPIError("Pleace Provide Emain & Password", 400);
  }

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = (req, res) => {
  // console.log(req.headers);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }

  // console.log(authHeader)
  const token = authHeader.split(" ")[1];
  // console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const luckyNumber = Math.ceil(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route", 401);
  }

  // const luckyNumber = Math.floor(Math.random()*100)
};

module.exports = { login, dashboard };
