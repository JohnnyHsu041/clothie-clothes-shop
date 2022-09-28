import { useCallback, useReducer } from "react";

interface InputInfo {
    [props: string]:
        | {
              value: string;
              isValid: boolean;
          }
        | undefined;
}

interface formInfo {
    inputInfoObject: InputInfo;
    formIsValid: boolean;
}

interface InputChangeAction {
    type: "INPUT_CHANGE";
    id: string;
    value: string;
    isValid: boolean;
}

interface SetFormAction {
    type: "SET_FORM";
    inputInfoObject: InputInfo;
    formIsValid: boolean;
}

type formInfoAction = InputChangeAction | SetFormAction;

const formInfoHandler = (state: formInfo, action: formInfoAction) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;

            for (let inputId in state.inputInfoObject) {
                if (!state.inputInfoObject[inputId]) continue;

                if (inputId === action.id) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid =
                        formIsValid && state.inputInfoObject[inputId]!.isValid;
                }
            }

            return {
                ...state,
                inputInfoObject: {
                    ...state.inputInfoObject,
                    [action.id]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                formIsValid,
            };

        case "SET_FORM":
            return {
                inputInfoObject: action.inputInfoObject,
                formIsValid: action.formIsValid,
            };

        default:
            return state;
    }
};

type FormValidity = (
    initObj: InputInfo,
    initFormValidity: boolean
) => [
    inputInfoObject: InputInfo,
    formIsValid: boolean,
    changeHandler: (id: string, value: string, isValid: boolean) => void,
    setForm: (inputObj: InputInfo, formValidity: boolean) => void
];

const useFormValidity: FormValidity = (initObj, initFormValidity) => {
    const [formInfo, dispatch] = useReducer(formInfoHandler, {
        inputInfoObject: initObj,
        formIsValid: initFormValidity,
    });

    const changeHandler = useCallback(
        (id: string, value: string, isValid: boolean) => {
            dispatch({ type: "INPUT_CHANGE", id, value, isValid });
        },
        []
    );

    const setForm = useCallback(
        (inputObj: InputInfo, formValidity: boolean) => {
            dispatch({
                type: "SET_FORM",
                inputInfoObject: inputObj,
                formIsValid: formValidity,
            });
        },
        []
    );

    const { inputInfoObject, formIsValid } = formInfo;

    return [inputInfoObject, formIsValid, changeHandler, setForm];
};

export default useFormValidity;
