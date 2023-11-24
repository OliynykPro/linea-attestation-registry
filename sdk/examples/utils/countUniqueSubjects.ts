import fs from "fs";
import path from "path";

const fetchAllSubjects = async () => {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../allSubjects-source.txt"), "utf8"));
};

async function main() {
  const allSubjects = await fetchAllSubjects();
  console.log("file read");

  const uniqueAttestations = allSubjects.reduce((acc: string[], current: string) => {
    if (!acc.find((subject) => subject === current)) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  console.log(`Unique subjects = ${uniqueAttestations.length}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
