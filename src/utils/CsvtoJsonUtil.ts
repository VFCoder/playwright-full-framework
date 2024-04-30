import * as fs from "fs";
import path from "path";

const CSVToJSON = (data, delimiter = ",") => {
  const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
  return data
    .slice(data.indexOf("\n") + 1)
    .split("\n")
    .map((v) => {
      const values = v.split(delimiter);
      return titles.reduce(
        (obj, title, index) => (
          (obj[title.trim()] = values[index].trim()), obj
        ),
        {}
      );
    });
};

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, "..");
const testdataDir = path.resolve(srcDir, "testdata");
const csvFilePath = `${testdataDir}`;

export const convertCsvFileToJsonFile = (
  csvFileName,
  jsonFileName,
  delimiter = ","
) => {
  try {
    const csvData = fs.readFileSync(`${testdataDir}/${csvFileName}`, "utf8");
    const jsonData = CSVToJSON(csvData, delimiter);
    fs.writeFileSync(
      `${testdataDir}/${jsonFileName}`,
      JSON.stringify(jsonData, null, 2)
    );
    console.log(
      `Conversion completed. JSON data written to: ${testdataDir}/${jsonFileName}`
    );
  } catch (error) {
    console.error("Error converting CSV to JSON:", error.message);
  }
};
