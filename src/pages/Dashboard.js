import Homepage from "../Homepage";
import { GET_PROJECT_DATA } from '../config';
import { useCallback, useContext, useEffect } from "react";
import TopLoading from "../Util/TopLoading";
import Retry from "../Util/Retry";
import useServer from "../db/useServer";
import { handleProjectData } from "../Helper/Common";
import fileContext from '../store/file-context'
import { toast } from "react-toastify";

const Dashboard = () => {

  const { handleAPICall: handleDataCall, error: projectError, data: projectData, isLoading: projectLoading } = useServer();
  const ctx = useContext(fileContext)

  const updateState = useCallback((data) => {
    ctx.updateAllData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // -----------------  Handling project data ----------------

  useEffect(() => {
    handleDataCall(GET_PROJECT_DATA)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (projectData) {
      const data = handleProjectData(projectData.message)
      updateState(data);
    }
    else if (projectError) {
      toast.error(projectError.error)
    }
    
  }, [projectData, projectError, updateState])

  return (
    <>
      {/* {projectLoading && } */}
      {projectLoading && <TopLoading message='Fetching data,' />}
      {projectError && <Retry />}
      {!projectLoading && <Homepage />}
    </>
  )
};

export default Dashboard;
