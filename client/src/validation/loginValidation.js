import Joi from "joi";

import validation from "./validation";

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })

        .required(),
    password: Joi.string()
        .pattern(new RegExp(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        ))
        .messages({
            "string.empty": "the password should not be empty",
            "string.pattern.base":
                "the password should be supper protected, this mean that its should contain only upper and lower case latter's",
        })
        .min(6).max(1024).required(),
});

const validateLoginSchema = (userInput) => validation(loginSchema, userInput);

export default validateLoginSchema;
