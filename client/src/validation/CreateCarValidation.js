import Joi from "joi";

import validation from "./validation";

const createCardSchema = Joi.object({
    manufacturer: Joi.string().pattern(new RegExp("^[A-Z][a-z0-9-\\s]{0,}$", "i")).min(2).max(256).required(),
    type: Joi.string().pattern(new RegExp("^[A-Z][a-z0-9-\\s]{0,}$", "i")).min(2).max(256).required(),
    subtype: Joi.string().max(1024).allow(null, ''),
    yearOfProduction: Joi.number().required(),
    previousOwners: Joi.number().min(1).max(256).required(),
    kilometers: Joi.number().allow(null, ''),
    engineType: Joi.string().allow(null, ''),
    fuelType: Joi.string().required(),
    phone: Joi.string()
        .pattern(new RegExp("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$", "i"))
        .min(9).max(14).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(6).max(256),
    url: Joi.string().min(6).max(1024).allow(null, ''),
    alt: Joi.string().min(2).max(256).allow(null, ''),
    state: Joi.string().min(2).max(256).allow(null, ''),
    // .pattern(new RegExp("[A-Z][a-z]+(?: +[A-Z][a-z]+)*")).min(2).max(256).
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),

});

const CreateCardValidation = (userInput) =>
    validation(createCardSchema, userInput);

export default CreateCardValidation;
