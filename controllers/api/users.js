const User = require('../../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const { getByPlaceholderText } = require("@testing-library/react");


module.exports = {
    create,
    login,
    checkToken
  };
  
  function createJWT(user) {
    console.log("Creating JWT")
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }

  async function create (req, res) {
    try {
      // Add the user to the database
      let user = await User.create(req.body);
      let token = createJWT(user);

      // console.log(`User: ${req.body}, Token: ${token}`)
      // Yes, we can use res.json to send back just a string
      // The client code needs to take this into consideration
      res.json(token);
      console.log(`User : ${req.body}, Token: ${token}`);
  
    } catch (err) {
      // Client will check for non-2xx status code
      // 400 = Bad Request
      res.status(400).json(err);
    }
  }

  async function login(req, res, next) {
      // try {
      //   const { email, password } = req.body;
      //   const user = await User.findOne({ email });
    
      //   if (!user) {
      //     return res.status(401).json({ message: "Invalid credentials" });
      //   }
      //   const isPasswordValid = await bcrypt.compare(password, user.password);
    
      //   if (!isPasswordValid) {
      //     return res.status(401).json({ message: "Invalid credentials" });
      //   }
      //   const token = createJWT(user);
      //   res.json(token);
      // } catch (err) {
      //   res.status(500).json({ message: "Internal Server Error" });
      // }


      try {

        let user = await User.findOne({email: req.body.email});
        console.log(`Current User : ${user}`);
        console.log(`Comparing : ${req.body.password} and also.... ${user.password}`);
        if (!user) throw new Error();
        let match = await bcrypt.compare(req.body.password, user.password);
        console.log(`MATCH FOUND: ${match}`)
        if (!match) throw new Error();
        res.json(createJWT(user));
        next();
      } catch (error) {
        console.log("ERROR:", error)
        res.status(400).json("Bad Credentials");
      }


      //   const { email, password } = req.body;
      //   let user = await User.findOne({ email });
    
      //   if (!user) {
      //     return res.status(401).json({ message: "Invalid credentials" });
      //   }
      //   const isPasswordValid = await bcrypt.compare(password, user.password);
    
      //   if (!isPasswordValid) {
      //     return res.status(401).json({ message: "Invalid credentials" });
      //   }
      //   const token = createJWT(user);
      //   res.json(token);
      // } catch (err) {
      //   res.status(500).json({ message: "Internal Server Error" });
      // }

      
  }

  function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
  }