// génère 500 documents au format JSON pour le schema Daybis
const fs = require("fs");

// Fonction pour cloner une Date sans muter l'originale
function cloneDate(d) {
  return new Date(d.getTime());
}

const docs = [];
const start = new Date(); // aujourd'hui
start.setHours(0, 0, 0, 0); // à minuit
start.setDate(start.getDate() - 1); // hier

for (let i = 0; i < 500; i++) {
  const d = cloneDate(start);
  d.setDate(start.getDate() - i);

  docs.push({
    breakfastImg: "",
    breakfastDesc: "",
    lunchImg: "",
    lunchDesc: "",
    dinnerImg: "",
    dinnerDesc: "",
    extras: [],
    sleep: 0,
    water: null,
    exercice: "",
    balance: ["good", "neutral", "bad"][Math.floor(Math.random() * 3)],
    date: d.toISOString(),
  });
}

fs.writeFileSync("daysbis.json", JSON.stringify(docs, null, 2), "utf-8");
