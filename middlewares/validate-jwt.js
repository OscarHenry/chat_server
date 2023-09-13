const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

      // read token
      const token = req.header('x-token');

      // check if token don't exists
      if (!token) {
          return res.status(401).json({
              ok: false,
              msg: 'Missing token'
          });
      }

    try {
    // validate token
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;
    
    next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }

};

module.exports = {validateJWT};