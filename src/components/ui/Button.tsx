import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import s from "../../styles/css/Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    type?: string;
    dest?: string;
    onClick?: MouseEventHandler;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
    if (props.type === "link") {
        return (
            <Link
                className={props.className}
                to={props.dest!}
                onClick={props.onClick}
            >
                {props.children}
            </Link>
        );
    }

    if (props.type === "submit") {
        return (
            <button type="submit" disabled={props.disabled}>
                {props.children}
            </button>
        );
    }

    return (
        <button className={props.className} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default Button;
