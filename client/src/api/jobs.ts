import { Job } from "@/types";
import api from "./api";

const URLs = {
  fetchJobs: "/v1/jobs",
};

export const fetchJobs = async () => {
  const res = await api.get<Job[]>(URLs.fetchJobs, {});
  return res.data;
};

export const createJob = async () => {
  const res = await api.post<Job>(URLs.fetchJobs, null, {});
  return res.data;
};
