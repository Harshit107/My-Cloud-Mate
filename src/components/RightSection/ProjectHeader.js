import ButtonWithAddIcon from "../../Util/ButtonWithAddIcon";
import classes from "./ProjectHeader.module.css";
import uploadIcon from "../../images/upload-icon.png";
import filterIcon from "../../images/filter-icn.png";
import sortIcon from "../../images/sort-icon.png";
import deleteIcon from "../../images/delete-icon-white.png";
import FileContext from "../../store/file-context";
import React, { useContext, useRef, useState } from "react";
import DeleteProjectModal from "../../Util/Modals/DeleteProjectModal";
import FileDetailModal from "../../Util/Modals/FileDetailsModal";
import ProjectFilesSort from "./ProjectFilesSort";
import ProjectFilesFilter from "./ProjectFilesFilter";
import TopLoading from "../../Util/TopLoading";
import hamburgerImage from "../../images/hamburger.png";
import ButtonWithAddIconResizeable from './../../Util/ButtonWithAddIconResizeable';

const ProjectHeader = () => {
  const ctx = useContext(FileContext);
  const isFilesAvailable = ctx.availableFiles.length !== 0;
  const selectedProject = ctx.activeProjectId;
  const [isDeleteClicked, setDeleteClicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileOpening, setIsFileOpening] = useState(false);
  const windowWidth = window.innerWidth;
  const fileInputRef = useRef();

  const handleSortButtonclicked = () => {
    const filterMainDiv = document.getElementById(
      "project-file-filter"
    ).classList;
    if (filterMainDiv.contains("display-content"))
      filterMainDiv.toggle("display-content");

    document
      .getElementById("project-file-sort")
      .classList.toggle("display-content");
  };

  const handleFilterButtonclicked = () => {
    const sortingMainDiv =
      document.getElementById("project-file-sort").classList;
    if (sortingMainDiv.contains("display-content"))
      sortingMainDiv.toggle("display-content");

    document
      .getElementById("project-file-filter")
      .classList.toggle("display-content");
  };
  function initialize() {
    document.body.onfocus = checkIt;
  }
  function checkIt() {
    document.body.onfocus = null;
    setIsFileOpening(false);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setIsFileOpening(false);
    setSelectedFile(file);
    event.target.value = null;
  };

  const handleButtonClick = () => {
    // Trigger the file input click event
    if (fileInputRef.current) {
      setIsFileOpening(true);
      fileInputRef.current.click();
    }
  };

  const handleDeleteProject = () => {
    setDeleteClicked(true);
  };

  function handleHamburClick() {
    const sideSection = document.getElementById("side-section");
    sideSection.style.marginLeft = '0%';
  }

  return (
    <div className={classes["project-header"]}>
      {isFileOpening && <TopLoading message="Processing file" />}
      {windowWidth < 700 && (
        <img
          className={classes.hamburger}
          src={hamburgerImage}
          alt="menu"
          onClick={handleHamburClick}
        />
      )}

      <div className={classes["project-header-action"]}>
        <input
          type="file"
          ref={fileInputRef}
          onClick={initialize}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <ButtonWithAddIconResizeable
          action={{ onClick: handleButtonClick }}
          className={classes.button}
          image={uploadIcon}
          buttonName="Upload File"
        />

        {isFilesAvailable && (
          <>
            <div className={classes.sort}>
              <ButtonWithAddIconResizeable
                className={classes.button}
                image={sortIcon}
                action={{
                  onClick: handleSortButtonclicked,
                }}
                buttonName="Sort"
              />
              <div className={classes.enable} id="project-file-sort">
                <ProjectFilesSort className={classes.button} />
              </div>
            </div>

            <div className={classes.filter}>
              <ButtonWithAddIconResizeable
                className={classes.button}
                image={filterIcon}
                action={{
                  onClick: handleFilterButtonclicked,
                }}
                buttonName="Filter"
              />
              <div className={classes.enable} id="project-file-filter">
                <ProjectFilesFilter className={classes.button} />
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        {isDeleteClicked && (
          <DeleteProjectModal
            removeBackdrop={() => setDeleteClicked(false)}
            id={selectedProject}
          />
        )}
        {selectedFile && (
          <FileDetailModal
            removeBackdrop={() => setSelectedFile(null)}
            id={selectedProject}
            selectedFile={selectedFile}
          />
        )}
        <ButtonWithAddIcon
          action={{ onClick: handleDeleteProject }}
          className={`${classes.button} ${classes["project-header-action-delete"]}`}
          image={deleteIcon}
          buttonName=""
        ></ButtonWithAddIcon>
      </div>
    </div>
  );
};

export default ProjectHeader;
