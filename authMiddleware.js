import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, "yourSecretKey"); // Verify token with your secret key
    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
