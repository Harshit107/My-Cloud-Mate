import classes from './FileDescriptionDiv.module.css'

const FileDescriptionDiv = (props) => {

    return <div className={classes.container}>
        <div className={classes.title}>{props.title}</div>
        <div className={classes.value}>{props.value}</div>
    </div>

}

export default FileDescriptionDiv;