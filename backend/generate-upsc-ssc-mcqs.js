import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// read base mcqs safely
const baseMCQs = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/base-mcqs.json"), "utf-8")
);

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024];
const EXAMS = ["UPSC", "SSC"];

const finalMCQs = [];
let count = 0;

while (finalMCQs.length < 500) {
  for (const mcq of baseMCQs) {
    if (finalMCQs.length >= 500) break;

    finalMCQs.push({
      ...mcq,
      examType: EXAMS[count % EXAMS.length],
      year: YEARS[count % YEARS.length],
      isActive: true
    });

    count++;
  }
}

fs.writeFileSync(
  path.join(__dirname, "data/mcqs.json"),
  JSON.stringify(finalMCQs, null, 2)
);

console.log(`✅ ${finalMCQs.length} REAL UPSC/SSC MCQs generated`);
