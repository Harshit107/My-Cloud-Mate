import Homepage from "../Homepage";
import { GET_PROJECT_DATA } from "../config";
import { useContext, useEffect, useRef } from "react";
import TopLoading from "../Util/TopLoading";
import Retry from "../Util/Retry";
import useServer from "../db/useServer";
import { handleProjectData } from "../Helper/Common";
import fileContext from "../store/file-context";
import { toast } from "react-toastify";

const Dashboard = () => {
  const {
    handleAPICall: handleDataCall,
    error: projectError,
    data: projectData,
    isLoading: projectLoading,
  } = useServer();
  const { updateAllData } = useContext(fileContext);
  const dataProcessedRef = useRef(null);

  // -----------------  Handling project data ----------------
  useEffect(() => {
    handleDataCall(GET_PROJECT_DATA);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (projectData && projectData !== dataProcessedRef.current) {
      dataProcessedRef.current = projectData;
      const parsedData = handleProjectData(projectData.data || projectData.message || projectData);
      updateAllData(parsedData);
    } else if (projectError) {
      const msg = typeof projectError === "string" ? projectError : projectError?.message || "Failed to load project data";
      toast.error(msg);
    }
  }, [projectData, projectError, updateAllData]);

  return (
    <>
      {projectLoading && <TopLoading message="Fetching data..." />}
      {projectError && <Retry />}
      {!projectLoading && <Homepage />}
    </>
  );
};

export default Dashboard;
