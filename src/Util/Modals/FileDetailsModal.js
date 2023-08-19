import Modal from "./Modal"
import ProjectDetailModelData from "./ProjectDetailModalData"


const FileDetailsModal = (props) => {

    return (
        <Modal removeBackdrop = {props.removeBackdrop}>
            <ProjectDetailModelData />
        </Modal>
    )

}

export default FileDetailsModal
