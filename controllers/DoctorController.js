const DoctorModel = require("../models/DoctorModels");

const getDoctorController = async (request, response) => {
  try {
    console.log(request.body.userId);
    let doctor = await DoctorModel.findOne({ userId: request.body.userId });

    response.status(200).send({
      success: true,
      message: "Doctor data fetch Successfully...",
      data: doctor,
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "Error While fetching Doctor Info",
      error,
    });
  }
};

const updateDoctorinfo = async (request, response) => {
  try {
    const doctor = await DoctorModel.findOneAndUpdate(
      { userId: request.body.userId },
      request.body
    );

    response.status(200).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "Error while update data",
      error,
    });
  }
};

const getSingleDoctorBIId = async (request, response) => {
  console.log(request.body.doctorId);
  try {
    let doctor = await DoctorModel.findOne({ _id: request.body.doctorId });
    console.log(doctor);
    response.status(200).send({
      success: true,
      message: "Single Doctor Fetch Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      error,
      message: "while fetching single Doctor data",
    });
  }
};
module.exports = { getDoctorController, updateDoctorinfo, getSingleDoctorBIId };
