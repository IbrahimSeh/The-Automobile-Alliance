import Joi from "joi";

import validation from "../validation";

const AddressSchema = Joi.object({
    state: Joi.string().min(2).max(256).allow(null, ''),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
});

const validateAddressSchema = (userInput) => {
    return validation(AddressSchema, userInput);
}

export default validateAddressSchema;
