const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_MAX_LENGTH = "MAX_LENGTH";
const VALIDATOR_TYPE_MIN_LENGTH = "MIN_LENGTH";
const VALIDATOR_TYPE_PASSWORD_CHECK = "PASSWORD_CHECK";

export const VALIDATOR_REQUIRE = (): validator => {
    return { type: VALIDATOR_TYPE_REQUIRE };
};
export const VALIDATOR_EMAIL = (): validator => {
    return { type: VALIDATOR_TYPE_EMAIL };
};
export const VALIDATOR_MAX_LENGTH = (value: number): validator => {
    return { type: VALIDATOR_TYPE_MAX_LENGTH, value };
};
export const VALIDATOR_MIN_LENGTH = (value: number): validator => {
    return { type: VALIDATOR_TYPE_MIN_LENGTH, value };
};
export const VALIDATOR_PASSWORD_CHECK = (password: string): validator => {
    return { type: VALIDATOR_TYPE_PASSWORD_CHECK, password };
};

type validator = {
    type: string;
    value?: number;
    password?: string;
};

const validate = (value: string, validators: validator[]) => {
    let isValid = true;

    for (let validator of validators) {
        if (validator.type === VALIDATOR_TYPE_REQUIRE) {
            isValid = isValid && value.trim().length > 0;
        }
        if (validator.type === VALIDATOR_TYPE_EMAIL) {
            isValid = isValid && value.includes("@");
        }
        if (validator.type === VALIDATOR_TYPE_MIN_LENGTH) {
            isValid = isValid && value.trim().length >= validator.value!;
        }
        if (validator.type === VALIDATOR_TYPE_MAX_LENGTH) {
            isValid = isValid && value.trim().length <= validator.value!;
        }
        if (validator.type === VALIDATOR_TYPE_PASSWORD_CHECK) {
            isValid = isValid && value.trim() === validator.password;
        }
    }

    return isValid;
};

export default validate;
