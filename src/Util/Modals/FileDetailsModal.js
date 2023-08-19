import Modal from "./Modal"
import ProjectDetailModelData from "./ProjectDetailModalData"


const FileDetailsModal = (props) => {

    return (
        <Modal removeBackdrop = {props.removeBackdrop} title = "Upload New File">
            <ProjectDetailModelData {...props}/>
        </Modal>
    )

}

export default FileDetailsModal
