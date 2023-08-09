const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];
fs.createReadStream("./kepler-data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (res) =>
    isHabitablePlanet(res) ? habitablePlanets.push(res) : false
  )
  .on("end", () => {
    console.log(`${habitablePlanets.length} habitable Planets found !`);
    console.log("-----------------------------------------------------");
    habitablePlanets.forEach((each, i) => {
      console.log(`${i + 1}. ${each.kepler_name}`);
    });
  })
  .on("error", (err) => console.log("OOPS !!!", err));

function isHabitablePlanet(planet) {
  return (
    planet.koi_disposition === "CONFIRMED" &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
}
