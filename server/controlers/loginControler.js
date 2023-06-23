import jwt from "jsonwebtoken";
import "dotenv/config";

export const login = (req, res) => {
  const secret = req.body[0];
  const token = jwt.sign({ secret: secret }, String(process.env.JWT_TOKEN), {
    expiresIn: "1h",
  });
  res.send(token);
};
