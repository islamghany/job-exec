import { Toaster } from "react-hot-toast";
import JobsPage from "@/components/JobsPage";

function App() {
  return (
    <div className="p-10 max-w-3xl mx-auto">
      <Toaster />
      <JobsPage />
    </div>
  );
}

export default App;
