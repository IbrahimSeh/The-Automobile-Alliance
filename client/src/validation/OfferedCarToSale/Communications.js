import Joi from "joi";

import validation from "../validation";

const CommunicationsSchema = Joi.object({
    phone: Joi.string()
        .pattern(new RegExp("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$", "i"))
        .min(9).max(14).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(6).max(256).allow(null, ''),
});

const validateCommunicationsSchema = (userInput) => {
    return validation(CommunicationsSchema, userInput);
}

export default validateCommunicationsSchema;
