const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
exports.register = async (req, res) => {

try {

const { email, password } = req.body;

// check existing user
const exists = await User.findOne({ email });

if (exists) {
return res.status(400).json({ message: "User already exists" });
}

// hash password
const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
...req.body,
password: hashedPassword
});

res.status(201).json({
message: "Registered Successfully"
});

} catch (err) {

console.log(err);
res.status(500).json({ message: "Server Error" });

}

};



// LOGIN
exports.login = async (req, res) => {

try {

const { email, password } = req.body;

const user = await User.findOne({ email });

if (!user) {
return res.status(400).json({ message: "Invalid Email" });
}

// compare password
const match = await bcrypt.compare(password, user.password);

if (!match) {
return res.status(400).json({ message: "Invalid Password" });
}

// generate token
const token = jwt.sign(
{
id: user._id,
role: user.role,
email: user.email
},
process.env.JWT_SECRET,
{ expiresIn: "7d" }
);


// remove password from response
const userData = {
id: user._id,
name: user.name,
email: user.email,
role: user.role
};


res.json({
token,
user: userData
});

} catch (err) {

console.log(err);
res.status(500).json({ message: "Server Error" });

}

};