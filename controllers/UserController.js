const userModel = require("../models/UserModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DoctorModel = require("../models/DoctorModels");

const loginController = async (request, response) => {
  try {
    const user = await userModel.findOne({ email: request.body.email });
    if (!user) {
      return response
        .status(200)
        .send({ message: "User Not Found", success: false });
    }
    const ismatch = await bcrypt.compare(request.body.password, user.password);
    if (!ismatch) {
      return response
        .status(200)
        .send({ message: "Invalid UserName And Password ", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    response
      .status(200)
      .send({ message: "Login SuccessFully...", success: true, token });
  } catch (error) {
    response.status(500).send({ message: `errorMessage :${error}` });
  }
};
const registerController = async (request, response) => {
  try {
    const existUser = await userModel.findOne({ email: request.body.email });
    if (existUser) {
      return response
        .status(200)
        .send({ message: "user already exist", success: false });
    } else {
      const password = request.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      request.body.password = hashedPassword;
      const newUser = new userModel(request.body);
      await newUser.save();
      response
        .status(201)
        .send({ message: "Register Successfully...", success: true });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const authController = async (request, resposnse) => {
  try {
    const user = await userModel.findOne({ _id: request.body.id });
    user.password = undefined;
    if (!user) {
      resposnse.status(200).send({
        message: "User Not Found",
        success: false,
      });
    } else {
      resposnse.status(200).send({
        success: true,
        data: user,
      });
    }
    // console.log(user.name);
  } catch (error) {
    console.log(error);
    resposnse.status(500).send({
      message: "Auth Error",
      success: false,
    });
  }
};
const applyDoctorController = async (request, response) => {
  try {
    let newDoctor = await DoctorModel({ ...request.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    // const adminId = adminUser._id;
    notification.push({
      type: "apply doctor request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has apply for a Doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });

    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    response.status(201).send({
      success: true,
      message: "Doctor account applid successfully",
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .send({ success: false, error, message: "Error while apply doctor" });
  }
};

const getAllNotificationConroller = async (request, response) => {
  try {
    let user = await userModel.findOne({ _id: request.body.userId });
    // console.log(user.seenNotification);
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updatedUser = await user.save();
    response.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      error,
      message: "something went wrong...",
    });
  }
};
const deleteAllNotificationConroller = async (request, response) => {
  try {
    let user = await userModel.findOne({ _id: request.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    response.status(200).send({
      success: true,
      message: "Notification deleted successfully ",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "unable to delete notification",
    });
  }
};

const getAllDoctor = async (request, response) => {
  try {
    let doctors = await DoctorModel.find({ status: "approved" });

    response.status(200).send({
      success: true,
      message: "Doctors Data fetched Successfully...",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "Error while fetching doctor data",
      error,
    });
  }
};

const bookAppointmentController = async (request, response) => {
  try {
    request.body.status = "pending";
    const newAppointment = new appointmentModel(request.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: request.body.userId });
    user.notification.push({
      type: "new Appointment request ",
      message: `A new appointment Request from ${request.body.userinfo.name}`,
      onClickPath: "/user/aapointment",
    });
    await user.save();
    response.status(200).send({
      success: true,
      message: "Appointment Book Successfully...",
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "error while fetching doctor for appointment",
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationConroller,
  deleteAllNotificationConroller,
  getAllDoctor,
  bookAppointmentController,
};
