import ButtonWithAddIcon from "../Util/ButtonWithAddIcon";
import ProjectList from "./LeftSection/ProjectList";
import ProjectMain from "./RightSection/ProjectMain";
import classes from "./Projects.module.css";
import PlusImage from "../images/plus.png";
import { useState } from "react";
import CreateProjectModal from "../Util/Modals/CreateProjectModal";

const Projects = () => {
  const [isBackdrop, setBackdrop] = useState(false);

  function handleCreateOnClick() {
    setBackdrop(true);
  }

  function removeBackdrop() {
    setBackdrop(false);
  }

  const buttonAction = {
    action: {
      onClick: handleCreateOnClick,
    },
  };

  function handleClose() {
    const sideSection = document.getElementById("side-section");
    sideSection.style.marginLeft = "-50%";
  }

  return (
    <div className={classes["main"]}>
      {isBackdrop && <CreateProjectModal removeBackdrop={removeBackdrop} />}

      <div id="side-section" className={classes["side-section"]}>
        <div className={classes.close} onClick={handleClose}>X</div>
        <ButtonWithAddIcon
          image={PlusImage}
          buttonName="New Project"
          action={buttonAction.action}
        />
        <ProjectList />
      </div>
      <div className={classes["main-section"]}>
        <ProjectMain />
      </div>
    </div>
  );
};

export default Projects;
