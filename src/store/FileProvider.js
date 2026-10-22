import FileContext from './file-context';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
import DUMMY_FILES, { PROJECT } from '../components/DummyFiles';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../Helper/LocalStorage';
import { getDefaultProjectId } from '../Helper/Common';
import { sortedData } from '../Helper/filter';

const defaultState = getDataFromLocalStorage() || {
  files: [],
  isAuthenticated: false,
  activeProjectId: 0,
  projects: PROJECT,
  availableFiles: DUMMY_FILES,
};

const fileReducer = (state, action) => {
  if (action.type === 'search') {
    const filterFiles = state.files.filter(
      (file) =>
        file.name.toLowerCase().includes(action.filename.toLowerCase()) &&
        file.projectId === state.activeProjectId
    );

    return {
      activeProjectId: state.activeProjectId,
      files: state.files,
      availableFiles: filterFiles,
      projects: state.projects,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
    };
  }

  if (action.type === 'SELECT_PROJECT') {
    const filterFiles = state.files.filter((file) => file.projectId === action.id);
    return {
      activeProjectId: action.id,
      files: state.files,
      availableFiles: filterFiles,
      projects: state.projects,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
    };
  }

  if (action.type === 'ADD_PROJECT') {
    const newProjects = state.projects.concat(action.project);
    return {
      activeProjectId: state.activeProjectId,
      files: state.files,
      availableFiles: state.availableFiles,
      projects: newProjects,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
    };
  }

  if (action.type === 'REMOVE_PROJECT') {
    const newProjects = state.projects.filter((project) => project._id !== action.id);
    const files = state.files.filter((file) => file.projectId !== action.id);
    const activeProjectId = getDefaultProjectId(state);
    return {
      activeProjectId: activeProjectId,
      files: files,
      availableFiles: state.availableFiles,
      projects: newProjects,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
    };
  }

  if (action.type === 'REMOVE_FILE') {
    const newFiles = state.files.filter((file) => file._id !== action._id);
    const availableFiles = state.availableFiles.filter((file) => file._id !== action._id);
    const activeProjectId = getDefaultProjectId(state);
    return {
      activeProjectId: activeProjectId,
      files: newFiles,
      availableFiles: availableFiles,
      projects: state.projects,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
    };
  }

  if (action.type === 'ADD_FILE') {
    const allFiles = state.files.concat(action.file);
    const availableFiles = state.availableFiles.concat(action.file);
    return {
      activeProjectId: state.activeProjectId,
      files: allFiles,
      availableFiles: availableFiles,
      projects: state.projects,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
    };
  }

  if (action.type === 'UPDATE_AVAILABLE_FILES') {
    return {
      activeProjectId: state.activeProjectId,
      files: state.files,
      availableFiles: action.files,
      projects: state.projects,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
    };
  }

  if (action.type === 'UPDATE_ALL') {
    const rawFiles = action.data?.files || [];
    const sortedAvailableFiles = sortedData(rawFiles, { sortBy: 'first', field: 'name' });
    const activeProjectId = action.data?.activeProjectId || getDefaultProjectId(action.data);
    const filterFiles = sortedAvailableFiles.filter((file) => file.projectId === activeProjectId);
    return {
      ...action.data,
      activeProjectId,
      files: sortedAvailableFiles,
      availableFiles: filterFiles,
    };
  }

  return defaultState;
};

const FileProvider = (props) => {
  const [filesStore, dispatchfiles] = useReducer(fileReducer, defaultState);

  // Sync to local storage on state change without triggering render-phase writes
  useEffect(() => {
    setDataToLocalStorage(filesStore);
  }, [filesStore]);

  const searchFileHandler = useCallback((text) => {
    dispatchfiles({
      type: 'search',
      filename: text,
    });
  }, []);

  const selectProjectHandler = useCallback((id) => {
    dispatchfiles({
      type: 'SELECT_PROJECT',
      id: id,
    });
  }, []);

  const addNewFileHandler = useCallback((file) => {
    dispatchfiles({
      type: 'ADD_FILE',
      file: file,
    });
  }, []);

  const addNewProjectHandler = useCallback((project) => {
    dispatchfiles({
      type: 'ADD_PROJECT',
      project: project,
    });
  }, []);

  const removeProjectHandler = useCallback((id) => {
    dispatchfiles({
      type: 'REMOVE_PROJECT',
      id: id,
    });
  }, []);

  const removeFileHandler = useCallback((id) => {
    dispatchfiles({
      type: 'REMOVE_FILE',
      _id: id,
    });
  }, []);

  const updateAvailableFilesHandler = useCallback((files) => {
    if (!files) {
      dispatchfiles((prev) => ({
        type: 'SELECT_PROJECT',
        id: filesStore.activeProjectId,
      }));
      return;
    }

    dispatchfiles({
      type: 'UPDATE_AVAILABLE_FILES',
      files,
    });
  }, [filesStore.activeProjectId]);

  const updateIsAuthenticatedHandler = useCallback((isUser = false) => {
    dispatchfiles({
      type: 'AUTH',
      isUser,
    });
  }, []);

  const updateAllData = useCallback((data = getDataFromLocalStorage()) => {
    dispatchfiles({
      type: 'UPDATE_ALL',
      data,
    });
  }, []);

  const filesState = useMemo(() => ({
    activeProjectId: filesStore.activeProjectId,
    files: filesStore.files,
    availableFiles: filesStore.availableFiles,
    projects: filesStore.projects,
    isAuthenticated: filesStore.isAuthenticated,
    searchFiles: searchFileHandler,
    selectedFilesFun: selectProjectHandler,
    addNewProject: addNewProjectHandler,
    addNewFile: addNewFileHandler,
    removeFile: removeFileHandler,
    removeProject: removeProjectHandler,
    updateAvailableFiles: updateAvailableFilesHandler,
    updateIsAuthenticated: updateIsAuthenticatedHandler,
    updateAllData: updateAllData,
  }), [
    filesStore.activeProjectId,
    filesStore.files,
    filesStore.availableFiles,
    filesStore.projects,
    filesStore.isAuthenticated,
    searchFileHandler,
    selectProjectHandler,
    addNewProjectHandler,
    addNewFileHandler,
    removeFileHandler,
    removeProjectHandler,
    updateAvailableFilesHandler,
    updateIsAuthenticatedHandler,
    updateAllData,
  ]);

  return <FileContext.Provider value={filesState}>{props.children}</FileContext.Provider>;
};

export default FileProvider;