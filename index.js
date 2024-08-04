const { parse } = require("csv-parse");
const fs = require("fs");

const PARSE_OPTIONS = {
  comment: "#",
  columns: true,
};
const habitablePlanets = [];

const isHabitable = (planet) =>
  planet["koi_disposition"] === "CONFIRMED" &&
  planet["koi_insol"] < 1.11 &&
  planet["koi_prad"] < 1.6;

fs.createReadStream("./kepler_data.csv")
  .pipe(parse(PARSE_OPTIONS))
  .on("data", (data) => {
    if (!isHabitable(data)) {
      return;
    }
    habitablePlanets.push(data);
  })
  .on("end", () => {
    console.log(
      "The result: ",
      habitablePlanets.map((planet) => planet["kepler_name"])
    );
    console.log("Length: ", habitablePlanets.length);
  })
  .on("error", (err) => {
    console.log("Error: ", err);
  });
