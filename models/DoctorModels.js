const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, "firstName is required."],
    },
    lastName: {
      type: String,
      require: [true, "lastName is required. "],
    },
    userId: {
      type: String,
    },
    contact: {
      type: String,
      require: [true, "phone no is required."],
    },
    email: {
      type: String,
      require: [true, "email is required."],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      require: [true, "address is required"],
    },
    specialization: {
      type: String,
      require: [true, "specialization is required."],
    },
    experience: {
      type: String,
      require: [true, "experience is required."],
    },
    feesPerConsaltation: {
      type: Number,
      require: [true, "fee is required."],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      require: [true, "work timing is required."],
    },
  },
  { timestamps: true }
);
const DoctorModel = mongoose.model("doctors", doctorSchema);
module.exports = DoctorModel;
