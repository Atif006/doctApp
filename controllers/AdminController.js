const DoctorModel = require("../models/DoctorModels");
const userModel = require("../models/UserModels");

const getAllUserController = async (request, response) => {
  try {
    let users = await userModel.find({});
    response.status(200).send({
      success: true,
      message: "users data",
      data: users,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "Error while fetching users",
      error,
    });
  }
};

const getAllDoctorsController = async (request, response) => {
  try {
    let doctors = await DoctorModel.find({});
    response.status(200).send({
      success: true,
      message: "doctors data",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: true,
      message: "Error while fetching Doctors",
      error,
    });
  }
};

const changeAccountStatusController = async (request, response) => {
  try {
    const { doctorId, status } = request.body;
    const doctor = await DoctorModel.findByIdAndUpdate(doctorId, { status });
    let user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Request Has ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    response.status(200).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "something went wrong..",
      error,
    });
  }
};
module.exports = {
  getAllDoctorsController,
  getAllUserController,
  changeAccountStatusController,
};
