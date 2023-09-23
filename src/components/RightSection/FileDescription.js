import classes from "./FileDescription.module.css";

import PdfIcon from "../../images/pdf-icon.png";
import JpgIcon from "../../images/jpg-icon.png";
import PngIcon from "../../images/png-icon.png";
import DocumentIcon from "../../images/document-icon.png";
import loadingImage from "../../images/loading-preview.png";
import Button from "../../Util/Button";
import FileDescriptionDiv from "./FileDescriptionDiv";
import { convertDateToString } from "../../Helper/Common";
import { useState } from "react";

const iconStore = {
  PDF: PdfIcon,
  JPG: JpgIcon,
  PNG: PngIcon,
};

const supportedType = (type) => {
    return ["png", "jpg", "jpeg", "gif","PNG","JPG","JPEG"].includes(type);
}

const FileDescription = (props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  function handleImageLoaded() {
    const actualFile = document.getElementById("actualFile");
    actualFile.style.height = 'auto'
    setIsImageLoaded(true);
  }


  const srcImage = () => {
    if (supportedType(props.type)) return props.downloadUrl;

    return iconStore[props.type.toUpperCase()] ?? DocumentIcon;
  };

  return (
    <div
      className={`${classes.container} ${classes.document} ${
        classes[props.type]
      }`}
    >
      {props.type && props.type !== "none" && (
        <img
          src={srcImage()}
          alt=" icon type"
          className={`${classes["fileIcon"]} `}
          id="actualFile"
          height='0px'
          onLoad={handleImageLoaded}
        />
      )}
      {!isImageLoaded && (
        <img
          src={loadingImage}
          alt="loading img"
          className={`${classes["fileIcon"]} ${classes.rotate}`}
        />
      )}

      <Button
        onClick={() => window.open(props.downloadUrl, "_blank")}
        className={classes.button}
      >
        Open
      </Button>
      <FileDescriptionDiv title="Name" value={props.name} />
      <FileDescriptionDiv title="Type" value={props.type} />
      <FileDescriptionDiv title="Size" value={props.size} />
      <FileDescriptionDiv
        title="Created"
        value={convertDateToString(props.createdAt)}
      />
      <FileDescriptionDiv
        title="Updated"
        value={convertDateToString(props.updatedAt)}
      />
    </div>
  );
};

export default FileDescription;
