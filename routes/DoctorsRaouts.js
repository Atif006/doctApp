const express = require("express");
const {
  getDoctorController,
  updateDoctorinfo,
  getSingleDoctorBIId,
} = require("../controllers/DoctorController");
const authMiddleWare = require("../middlewares/authMiddleWare");
const router = express.Router();

router.post("/getDoctorinfo", authMiddleWare, getDoctorController);
router.post("/updateDoctor", authMiddleWare, updateDoctorinfo);
router.post("/getSingleDocotorInfo", authMiddleWare, getSingleDoctorBIId);

module.exports = router;
