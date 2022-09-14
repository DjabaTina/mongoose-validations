const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    "d84cc807d5ed76261eb8743043e7b6f086198842d5e3fbaec568cac5cd3b74a4",
    {
      expiresIn: "1h",
    }
    
  );

  return {
    token,
    user,
  };
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  // checking to see if email already exists
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    return res.status(400).json({ error: "Email already in used." });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ ...req.body, password: hashedPassword });

  //generate token

  const token = generateToken(user);

  res.status(201).json({ returnUser });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }
  //   const token = jwt.sign(
  //     { id: user._id, email: user.email },
  //     "d84cc807d5ed76261eb8743043e7b6f086198842d5e3fbaec568cac5cd3b74a4",
  //     {
  //       expiresIn: "1h",
  //     }
  //   );

  const token = generateToken(user);

  res.status(200).json({ token });
};
