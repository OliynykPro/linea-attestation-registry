import { VeraxSdk } from "../../src/VeraxSdk";
import fs from "fs";
import path from "path";

const fetchAllAttestations = async () => {
  let skip = 0;
  let hasMoreResults = true;
  const allSubjects: string[] = [];

  console.log("Start");

  const veraxSdk = new VeraxSdk(VeraxSdk.DEFAULT_LINEA_MAINNET);

  while (hasMoreResults && allSubjects.length < 150000) {
    console.log(`Batch #${skip}`);
    const matchingAttestations = await veraxSdk.attestation.findBy(1000, skip * 1000 + 149999);

    if (matchingAttestations.length === 0) {
      hasMoreResults = false;
      continue;
    }

    const subjects = matchingAttestations.map((attestation) => attestation.subject);

    allSubjects.push(...subjects);
    skip++;
  }

  console.log("End");

  return allSubjects;
};

async function main() {
  const allSubjects = await fetchAllAttestations();

  fs.writeFile(path.resolve(__dirname, "../../allSubjects.txt"), JSON.stringify(allSubjects), function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
