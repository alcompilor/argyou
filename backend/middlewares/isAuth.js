import jwt from "jsonwebtoken";
import ResponseData from "../classes/ResponseData.js";
import ErrorResponse from "../classes/ErrorResponse.js";

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
    return res.status(403).json(new ResponseData("No token provided", 403));
  }

  try {
    const validToken = jwt.verify(token, process.env.SECRET_KEY);
    req.decodedToken = validToken;
    
    next();
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export default isAuth;