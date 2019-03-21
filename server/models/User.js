const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserScheme = new Schema({
  name: String,
  email: String,
  status: String,
  address: String,
  agency: String,
  startDate: Date,
  phoneNumber: String,
  gender: String,
  disponibility: false,
  birthday: Date,
  projects: [
    {
      name: String,
      description: String,
      technology: String,
      society: String,
      Taille: String,
      startDate: Date,
      EndDate: Date,
      technology: String,
      status: String,
      Progress: String
    }
  ],
  formations: [
    {
      name: String,
      Lieu: String,
      EndDate: Date,
      Rank: String
    }
  ],
  role: [
    {
      type: String,
      experience: String
    }
  ],
  skills: [
    {
      name: String,
      value: Number
    }
  ]
});

mongoose.model("User", UserScheme);
