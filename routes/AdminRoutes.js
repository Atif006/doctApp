const express = require("express");
const {
  getAllUserController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/AdminController");
const authMiddleWare = require("../middlewares/authMiddleWare");
const router = express.Router();

router.get("/admin/users", authMiddleWare, getAllUserController);
router.get("/admin/doctors", authMiddleWare, getAllDoctorsController);
router.post(
  "/admin/changeAccountStatus",
  authMiddleWare,
  changeAccountStatusController
);
module.exports = router;
