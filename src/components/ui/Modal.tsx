import ReactDOM from "react-dom";

import s from "../../styles/css/Modal.module.css";
import Backdrop from "./Backdrop";

interface ModalProps {
    modalClassName?: string;
    headerClassName?: string;
    footerClassName?: string;
    onSubmit?: (event: React.FormEvent) => void;
    onCancel: (event: React.MouseEvent) => void;
    show: boolean;
    header: string;
    children: React.ReactNode;
    footer: string | JSX.Element;
}

const Modal: React.FC<ModalProps> = (props) => {
    const content = (
        <>
            <Backdrop onClick={props.onCancel} show={props.show} />
            <div className={s.modal || props.modalClassName}>
                <header className={s["modal__header"] || props.headerClassName}>
                    <h3>{props.header}</h3>
                </header>
                <form
                    onSubmit={
                        props.onSubmit
                            ? props.onSubmit
                            : (event) => event.preventDefault()
                    }
                >
                    <div
                        className={s["modal__content"] || props.modalClassName}
                    >
                        {props.children}
                    </div>
                </form>
                <footer className={s["modal__footer"] || props.footerClassName}>
                    {props.footer}
                </footer>
            </div>
        </>
    );

    return ReactDOM.createPortal(
        content,
        document.getElementById("modal-hook")!
    );
};

export default Modal;
