const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationConroller,
  deleteAllNotificationConroller,
  getAllDoctor,
  bookAppointmentController,
} = require("../controllers/UserController");
const authMiddleWare = require("../middlewares/authMiddleWare");

const router = express.Router();
router.post("/login", loginController);
router.post("/register", registerController);
router.post("/getUserData", authMiddleWare, authController);
router.post("/applyDoctor", authMiddleWare, applyDoctorController);
router.post("/getAllNotification", authMiddleWare, getAllNotificationConroller);
router.post(
  "/deleteAllNotification",
  authMiddleWare,
  deleteAllNotificationConroller
);

router.get("/getAllDoctor", authMiddleWare, getAllDoctor);
router.post("/book-appointments", authMiddleWare, bookAppointmentController);
module.exports = router;
