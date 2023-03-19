const JWT = require("jsonwebtoken");
module.exports = async (request, response, next) => {
  try {
    const token = request.headers["authorization"].split(" ")[1];
    console.log(token);
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return response
          .status(200)
          .send({ message: "Auth Failed ho rha h", success: false });
      } else {
        request.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: "Auth failed ",
      success: false,
    });
  }
};
