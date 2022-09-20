import { Link } from "react-router-dom";

import s from "../../styles/css/Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    type?: string;
    dest?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
    if (props.type === "link") {
        return <Link to={props.dest!}>{props.children}</Link>;
    }

    return <button onClick={props.onClick}>{props.children}</button>;
};

export default Button;
