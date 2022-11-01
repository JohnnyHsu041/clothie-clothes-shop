import Button from "./Button";
import Modal from "./Modal";

interface ErrorModalProps {
    error: string | null;
    onClear: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = (props) => {
    return (
        <Modal
            show={!!props.error}
            header={"錯誤"}
            footer={<Button onClick={props.onClear}>確定</Button>}
            onCancel={props.onClear}
        >
            <p>{props.error}</p>
        </Modal>
    );
};

export default ErrorModal;
