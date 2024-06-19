//check username and password in post(login) request
//if exist create new JWT
//send back to front-end

const CustomAPIError = require("../errors/custom-error");

//setup authentication so only the requst with JWT can access the dashboard


const login = (req , res) => {
    const {username , password} = req.body
    //mongo validation
    //joi
    //check in the controller
    if(!username || !password){
        throw new CustomAPIError('Pleace Provide Emain & Password' , 400)
    }
    console.log(username , password);

    res.send('Fake Login/Register/Singn Up Route')
}

const dashboard = (req, res) => {
    // const luckyNumber = Math.floor(Math.random()*100)
    const luckyNumber = Math.ceil(Math.random()*100)
    res.status(200).json({msg:`Hello Lian` , secret:`Here is your authorized data, your lucky number is ${luckyNumber}`})
}

module.exports = {login , dashboard}