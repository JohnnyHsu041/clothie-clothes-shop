import React, { ChangeEventHandler, FormEventHandler, useReducer } from "react";
import s from "../../styles/css/Input.module.css";
import validate from "../../utils/validator";

type validator = {
    type: string;
    value?: number;
};

interface InputProps {
    id: string;
    type: string;
    style?: { [props: string]: string };
    title: string;
    placeholder?: string;
    initValue?: string;
    initValidity?: boolean;
    validators: validator[];
}

interface InputState {
    value: string;
    isValid: boolean;
    isTouched: boolean;
}

type ChangeAction = { type: "CHANGE"; value: string; validators: validator[] };
type TouchAction = { type: "TOUCHED" };

const inputReducer = (
    state: InputState,
    action: ChangeAction | TouchAction
) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators),
            };

        case "TOUCHED":
            return {
                ...state,
                isTouched: true,
            };

        default:
            return state;
    }
};

const Input: React.FC<InputProps> = (props) => {
    const [enteredValue, dispatch] = useReducer(inputReducer, {
        value: props.initValue || "",
        isValid: props.initValidity || false,
        isTouched: false,
    });

    const { value, isTouched, isValid } = enteredValue;

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "CHANGE",
            value: event.target.value,
            validators: props.validators!,
        });
    };

    const touchHandler = () => {
        dispatch({ type: "TOUCHED" });
    };

    console.log(enteredValue);

    return (
        <div
            style={props.style}
            className={`${s.input} ${isTouched && !isValid && s.invalid}`}
        >
            <label htmlFor={props.id}>{props.title}</label>
            <input
                id={props.id}
                type={props.type}
                required
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={value}
            />
        </div>
    );
};

export default Input;
