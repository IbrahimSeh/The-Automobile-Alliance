import Joi from "joi";

import validation from "./validation";

const createCardSchema = Joi.object({
    title: Joi.string().pattern(new RegExp("^[A-Z][a-z0-9-\\s]{0,}$", "i")).min(2).max(256).required(),
    subTitle: Joi.string().pattern(new RegExp("^[A-Z][a-z0-9-\\s]{0,}$", "i")).min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string()
        .pattern(new RegExp("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$", "i"))
        .min(9).max(14).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(6).max(256).required(),
    url: Joi.string().min(6).max(2048).allow(null, ''),
    // pattern image url = .pattern(new RegExp("(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)"))
    alt: Joi.string().min(2).max(256).allow(null, ''),
    state: Joi.string().min(2).max(256).allow(null, ''),
    // .pattern(new RegExp("[A-Z][a-z]+(?: +[A-Z][a-z]+)*")).min(2).max(256).
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.string().pattern(new RegExp("^[1-9]\\d*(?:[ -]?(?:[a-zA-Z]+|[1-9]\\d*))?$")).min(1).max(256).required(),
    zipCode: Joi.number().min(1).max(99999999).allow(null, ''),
    web: Joi.string().min(5).max(255).allow(null, ''),

});

const CreateCardValidation = (userInput) =>
    validation(createCardSchema, userInput);

export default CreateCardValidation;
