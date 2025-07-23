const mongoose = require("mongoose");

const exerciceSchema = mongoose.Schema({
  exercice: { type: String, default: "" },
  rep: { type: Number, default: 0 },
  cycle: { type: Number, default: 0 },
});

const extraSchema = mongoose.Schema({
  extraImg: { type: String, default: "" },
  extraDesc: { type: String, default: "" },
});

const daySchema = mongoose.Schema({
  breakfastImg: { type: String, default: "" },
  breakfastDesc: { type: String, default: "" },
  lunchImg: { type: String, default: "" },
  lunchDesc: { type: String, default: "" },
  dinnerImg: { type: String, default: "" },
  dinnerDesc: { type: String, default: "" },
  extras: [extraSchema],
  sleep: { type: Number, default: 0 },
  water: { type: Boolean, default: null },
  exercice: { type: String, default: "" },
  balance: { type: String, default: "good" },
  date: Date,
});

const Day = mongoose.model("days", daySchema);

module.exports = Day;
