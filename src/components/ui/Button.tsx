import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import s from "../../styles/css/Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    type?: string;
    dest?: string;
    onClick?: MouseEventHandler;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
    if (props.type === "link") {
        return <Link to={props.dest!}>{props.children}</Link>;
    }

    if (props.type === "submit") {
        return (
            <button type="submit" disabled={props.disabled}>
                {props.children}
            </button>
        );
    }

    return <button onClick={props.onClick}>{props.children}</button>;
};

export default Button;
