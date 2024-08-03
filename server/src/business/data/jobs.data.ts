import path from "path";
import { promises as fs } from "fs";
import { Job } from "@/foundation/types";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JOBS_FILE = path.join(__dirname, "jobs.json");

export const writeJobs = async (jobs: Job[]) => {
  await fs.writeFile(JOBS_FILE, JSON.stringify(jobs, null, 2));
};

export const readJobs = async (): Promise<Job[]> => {
  try {
    // read the file in utf-8 format and if it is not found, create it with an empty array
    const jobs = await fs.readFile(JOBS_FILE, "utf-8");
    return JSON.parse(jobs);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      await writeJobs([]);
      return [];
    } // if the problem with the json parsing, return an empty array
    else if (err instanceof SyntaxError) {
      await writeJobs([]);
      return [];
    } else {
      throw err;
    }
  }
};
