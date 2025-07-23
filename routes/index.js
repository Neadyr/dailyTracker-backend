var express = require("express");
var router = express.Router();
const Day = require("../models/days");
const Daybis = require("../models/daysbis");
let moment = require("moment");
let { cloudinaryFileUpload } = require("../modules/upload");
let { checkBalance } = require("../modules/checkBalance");
/* GET home page. */

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
router.get("/initDay", async (req, res) => {
  const today = moment().utc();
  const todayStart = moment().format("YYYY MM DD");
  const todayEnd = moment().add(1, "d").format("YYYY MM DD");
  const alreadyInitialized = await Day.findOne({
    date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
  });

  let keepGoing = true;
  let i = -1;
  let dayStreak = 0;
  let timeSinceLastBadDay = 0;
  let crossedANeutral = false;
  while (keepGoing) {
    const loopIndexStartDate = moment().add(i, "d").format("YYYY MM DD");
    const loopIndexEndDate = moment()
      .add(i + 1, "d")
      .format("YYYY MM DD");

    const currentLoopDay = await Day.findOne({
      date: {
        $gte: new Date(loopIndexStartDate),
        $lte: new Date(loopIndexEndDate),
      },
    });
    if (!currentLoopDay) {
      keepGoing = false;
      break;
    }
    if (currentLoopDay.balance === "good" && !crossedANeutral) dayStreak++;

    if (currentLoopDay.balance === "neutral" && !crossedANeutral)
      crossedANeutral = true;

    if (
      currentLoopDay.balance === "bad" ||
      currentLoopDay.balance === "terrible"
    ) {
      keepGoing = false;
    } else {
      i--;
      timeSinceLastBadDay++;
    }
  }

  if (alreadyInitialized) {
    res.json({
      result: true,
      message: "Day already initialized",
      dayStreak: dayStreak,
      timeSinceLastBadDay,
    });
  } else {
    new Day({ date: today }).save();

    res.json({
      result: true,
      message: "Day properly initialised",
      dayStreak: dayStreak,
      timeSinceLastBadDay,
    });
  }
});

router.get("/checkToday", async (req, res) => {
  const todayStart = moment().format("YYYY MM DD");
  const todayEnd = moment().add(1, "d").format("YYYY MM DD");
  const today = await Day.findOne({
    date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
  });
  today ? res.json({ result: true, today }) : res.json({ result: false });
});

router.put("/saveFood/:balance", async (req, res) => {
  const todayStart = moment().format("YYYY MM DD");
  const todayEnd = moment().add(1, "d").format("YYYY MM DD");
  const today = await Day.findOne({
    date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
  });

  if (today.date) {
    if (req.body[Object.keys(req.body)[0]] === "jeun") {
      await Day.updateOne(
        {
          date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
        },
        {
          [Object.keys(req.body)[0]]: req.body[[Object.keys(req.body)[0]]],
          [Object.keys(req.body)[1]]: req.body[[Object.keys(req.body)[1]]],
          balance: checkBalance(today.balance, req.params.balance),
        }
      );
      return res.json({ result: true, message: "saved jeun" });
    }

    const url = await cloudinaryFileUpload(
      req.files[[Object.keys(req.files)[0]]]
    );

    await Day.updateOne(
      {
        date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
      },
      {
        [Object.keys(req.files)[0]]: url,
        [Object.keys(req.body)[0]]: req.body[[Object.keys(req.body)[0]]],
        balance: checkBalance(today.balance, req.params.balance),
      }
    );

    res.json({ result: true });
  } else {
    res.json({
      result: false,
      error: "Today's form hasn't been generated yet",
    });
  }
});

router.put("/saveExtra/:balance", async (req, res) => {
  const todayStart = moment().format("YYYY MM DD");
  const todayEnd = moment().add(1, "d").format("YYYY MM DD");
  const today = await Day.findOne({
    date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
  });

  if (today.date) {
    const url = await cloudinaryFileUpload(
      req.files[[Object.keys(req.files)[0]]]
    );

    await Day.updateOne(
      {
        date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
      },
      {
        $push: {
          extras: {
            extraImg: url,
            extraDesc: req.body[Object.keys(req.body)[0]],
          },
        },
        balance: checkBalance(today.balance, req.params.balance),
      }
    );

    res.json({ result: true });
  } else {
    res.json({
      result: false,
      error: "Today's form hasn't been generated yet",
    });
  }
});

router.put("/saveWater/:balance", async (req, res) => {
  const todayStart = moment().format("YYYY MM DD");
  const todayEnd = moment().add(1, "d").format("YYYY MM DD");
  const today = await Day.findOne({
    date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
  });
  const update = await Day.updateOne(
    {
      date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
    },
    {
      water: req.body.water,
      balance: checkBalance(today.balance, req.params.balance),
    }
  );

  if (update.modifiedCount > 0) {
    res.json({ result: true, message: "Updated Water" });
  } else {
    res.json({ result: false, error: "Something went wrong" });
  }
});

router.put("/saveExercice/:balance", async (req, res) => {
  const todayStart = moment().format("YYYY MM DD");
  const todayEnd = moment().add(1, "d").format("YYYY MM DD");
  const today = await Day.findOne({
    date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
  });
  const update = await Day.updateOne(
    {
      date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
    },
    {
      exercice: req.body.exercice,
      balance: checkBalance(today.balance, req.params.balance),
    }
  );

  if (update.modifiedCount > 0) {
    res.json({ result: true, message: "Exercice saved" });
  } else {
    res.json({ result: false, error: "Something went wrong" });
  }
});

router.put("/saveSleep/:sleep/:balance", async (req, res) => {
  const todayStart = moment().format("YYYY MM DD");
  const todayEnd = moment().add(1, "d").format("YYYY MM DD");
  const today = await Day.findOne({
    date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
  });
  const update = await Day.updateOne(
    {
      date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
    },
    {
      sleep: parseFloat(req.params.sleep),
      balance: checkBalance(today.balance, req.params.balance),
    }
  );

  if (update.modifiedCount > 0) {
    res.json({ result: true, message: "Updated Sleep" });
  } else {
    res.json({ result: false, error: "Something went wrong" });
  }
});

router.get("/getAllDays", (req, res) => {
  Day.find().then((data) => {
    res.json({ result: true, days: data });
  });
});

router.get("/getFormattedAllDays", (req, res) => {
  Day.find().then((data) => {
    const formattedData = [];

    for (let elem of data.reverse()) {
      let getYear = elem.date.getUTCFullYear();
      let getMonth = months[elem.date.getUTCMonth()];
      let getDay = days[elem.date.getDay()];

      const foundYearInArray = formattedData.find((year) =>
        year.hasOwnProperty(getYear)
      );

      if (foundYearInArray) {
        const foundMonthInYear = foundYearInArray[getYear].find((month) =>
          month.hasOwnProperty(getMonth)
        );
        if (foundMonthInYear) {
          foundMonthInYear[getMonth].push(elem);
        } else {
          foundYearInArray[getYear].push({ [getMonth]: [elem] });
        }
      } else {
        formattedData.push({ [getYear]: [{ [getMonth]: [elem] }] });
      }
    }

    res.json({ days: formattedData });
  });
});

router.get("/getSingleDay/:date", async (req, res) => {
  const todayStart = moment(req.params.date).format("YYYY MM DD");
  const todayEnd = moment(req.params.date).add(1, "d").format("YYYY MM DD");

  const today = await Day.findOne({
    date: { $gte: new Date(todayStart), $lte: new Date(todayEnd) },
  });
  if (today) {
    res.json({ result: true, today });
  } else {
    res.json({ result: false, error: "Didn't find any matching day" });
  }
});
module.exports = router;
