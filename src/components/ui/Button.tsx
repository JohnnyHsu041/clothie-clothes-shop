import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    type?: string;
    dest?: string;
    onClick?: MouseEventHandler;
    onMouseEnter?: MouseEventHandler;
    onMouseLeave?: MouseEventHandler;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
    if (props.type === "link") {
        return (
            <Link
                className={props.className}
                to={props.dest!}
                onClick={props.onClick}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                style={props.disabled ? { pointerEvents: "none" } : {}}
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
        <button
            className={props.className}
            onClick={props.onClick}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            {props.children}
        </button>
    );
};

export default Button;
