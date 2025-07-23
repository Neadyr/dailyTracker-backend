const mongoose = require("mongoose");

const extraSchema = mongoose.Schema({
  extraImg: { type: String, default: "" },
  extraDesc: { type: String, default: "" },
});

const daybisSchema = mongoose.Schema({
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

const Daybis = mongoose.model("daysbis", daybisSchema);

module.exports = Daybis;
