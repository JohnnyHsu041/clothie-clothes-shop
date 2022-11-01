import ReactDOM from "react-dom";

import s from "../../styles/css/Backdrop.module.css";

interface BackdropProps {
    onClick: (event: React.MouseEvent) => void;
    show: boolean;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
    if (props.show) {
        document.body.style.overflow = "hidden";
    }

    const content = <div className={s.backdrop} onClick={props.onClick}></div>;

    return ReactDOM.createPortal(
        content,
        document.getElementById("backdrop-hook")!
    );
};

export default Backdrop;
