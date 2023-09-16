import classes from './FileDescription.module.css'

import PdfIcon from '../../images/pdf-icon.png'
import JpgIcon from '../../images/jpg-icon.png'
import PngIcon from '../../images/png-icon.png'
import DocumentIcon from '../../images/document-icon.png'
import loadingImage from '../../images/loading-preview.png'
import Button from '../../Util/Button'
import FileDescriptionDiv from './FileDescriptionDiv'
import { convertDateToString } from '../../Helper/Common'
import { useState } from 'react'

const iconStore = {
    "PDF": PdfIcon,
    "JPG": JpgIcon,
    "PNG": PngIcon
}

const FileDescription = (props) => {

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    function handleImageLoaded() {
        
        setIsImageLoaded(true);
    }


    const srcImage = () => {
        if (props.type === 'png' || props.type === 'jpg') {

            return props.downloadUrl;

        }
        return iconStore[props.type.toUpperCase()] ?? DocumentIcon;
    }

    return <div className={`${classes.container} ${classes.document} ${classes[props.type]}`} >
        {props.type && props.type !== 'none'
            && <img src={srcImage()} alt=' icon type' width='0px' 
                className={`${classes['fileIcon']} `}
                onLoad={handleImageLoaded}
            />
        }
        {!isImageLoaded && <img src={loadingImage} alt='loading img'
            className={`${classes['fileIcon']} ${classes.rotate}`}
        />}


        <Button onClick={() => window.open(props.downloadUrl, '_blank')} className={classes.button}>Open</Button>
        <FileDescriptionDiv title="Name" value={props.name} />
        <FileDescriptionDiv title="Type" value={props.type} />
        <FileDescriptionDiv title="Size" value={props.size} />
        <FileDescriptionDiv title="Created" value={convertDateToString(props.createdAt)} />
        <FileDescriptionDiv title="Updated" value={convertDateToString(props.updatedAt)} />
    </div>
}


export default FileDescription;