import Homepage from "../Homepage";
import { GET_PROJECT_DATA } from "../config";
import { useCallback, useContext, useEffect } from "react";
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
  const ctx = useContext(fileContext);

  const updateState = useCallback(
    (data) => {
      ctx.updateAllData(data);
    },
    [ctx]
  );

  // -----------------  Handling project data ----------------
  useEffect(() => {
    handleDataCall(GET_PROJECT_DATA);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (projectData) {
      const parsedData = handleProjectData(projectData.data || projectData.message || projectData);
      updateState(parsedData);
    } else if (projectError) {
      const msg = typeof projectError === "string" ? projectError : projectError?.message || "Failed to load project data";
      toast.error(msg);
    }
  }, [projectData, projectError, updateState]);

  return (
    <>
      {projectLoading && <TopLoading message="Fetching data..." />}
      {projectError && <Retry />}
      {!projectLoading && <Homepage />}
    </>
  );
};

export default Dashboard;
