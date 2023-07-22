import Joi from "joi";

import validation from "./validation";

const registerSchema = Joi.object({
    firstName: Joi.string().pattern(new RegExp("\\b([A-ZA-y][-,a-z. ']+[ ]*)+", "i")).min(2).max(256).required(),
    middleName: Joi.string().pattern(new RegExp("\\b([A-ZA-y][-,a-z. ']+[ ]*)+", "i")).min(2).max(256).allow(null, ''),
    lastName: Joi.string().pattern(new RegExp("\\b([A-ZA-y][-,a-z. ']+[ ]*)+", "i")).min(2).max(256).required(),
    phone: Joi.string()
        .pattern(new RegExp("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$", "i"))
        .min(9).max(14).required(),
    email: Joi.string().min(6).max(256)
        .email({ tlds: { allow: false } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{0,}$", "i"))
        .min(2)
        .max(10)
        .required(),
    imgUrl: Joi.string().min(6).max(1024).allow(null, ''),
    // pattern(new RegExp("(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)")).
    imgAlt: Joi.string().min(6).max(256).allow(null, ''),
    state: Joi.string().min(2).max(256).allow(null, ''),
    // .pattern(new RegExp("[A-Z][a-z]+(?: +[A-Z][a-z]+)*")).
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.string().pattern(new RegExp("^[1-9]\\d*(?:[ -]?(?:[a-zA-Z]+|[1-9]\\d*))?$")).min(1).max(256).required(),
    zipCode: Joi.number().min(1).max(99999999),
    isBussiness: Joi.boolean(),
});

const signupValidation = (userInput) =>
    validation(registerSchema, userInput);

export default signupValidation;
