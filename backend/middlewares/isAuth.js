import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  const authStatus = req.cookies.auth;

  if (!token) {
    if (authStatus) {
      res.clearCookie('auth', {
            sameSite: 'strict',
            secure: true,
        });
    };
    return res.status(403).send("No token found");
  }

  try {
    const validToken = jwt.verify(token, process.env.SECRET_KEY);
    req.decodedToken = validToken;
    
    return next();
  } catch (error) {
    return res.status(403).send(`Error occured: ${error}`);
  }
};

export default isAuth;