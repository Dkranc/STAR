import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const secret = req.body[0];
  const token = jwt.sign({ secret: secret }, "9809502", { expiresIn: "1h" });
  res.send(token);
};
