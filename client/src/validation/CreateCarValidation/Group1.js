import Joi from "joi";

import validation from "../validation";

const createCarSchemaGroup1 = Joi.object({
    subType: Joi.string().max(256).allow(null, ''),
    engineType: Joi.string().min(2).max(256).required(),
    phone: Joi.string()
        .pattern(new RegExp("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$", "i"))
        .min(9).max(14).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(6).max(256).allow(null, ''),
    state: Joi.string().min(2).max(256).allow(null, ''),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
});

const Group1 = (userInput) => {
    return validation(createCarSchemaGroup1, userInput);
}

export default Group1;
