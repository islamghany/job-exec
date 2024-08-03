import { fetchJobs, createJob } from "@/api";
import { useShortPolling } from "@/hooks/useShortPoling";
import { PageHeader } from "@/components/PageHeader";
import { JobsList } from "@/components/JobsList";
import { Job } from "@/types";
import { toast } from "react-hot-toast";

function JobsPage() {
  // short polling is a simple way to keep the data up to date
  // another options are websockets, server-sent events (push notifications), or long polling.
  const { data, setData } = useShortPolling({
    fetcher: fetchJobs,
    interval: 2000, // fetch jobs every 2 seconds
  });
  const handleOnJobRequestSettled = (job: Job | null, err: Error | null) => {
    if (job) {
      toast.success("Job created successfully");
      // handle optimistic update
      setData((prevData) => {
        return prevData ? [job, ...prevData] : [job];
      });
    } else {
      toast.error("Failed to create job");
      console.error(err);
    }
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <PageHeader
        createJob={createJob}
        title="Jobs"
        buttonText="Create Job"
        onSettled={handleOnJobRequestSettled}
      />
      <div className="h-6" />
      <JobsList jobs={data || []} />
    </div>
  );
}

export default JobsPage;
