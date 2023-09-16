import Joi from "joi";

import validation from "../validation";

const RestSchema = Joi.object({
    previousOwners: Joi.number().min(0).max(3000).required(),
    kilometers: Joi.number().min(0).max(2000000).required(),
});

const validateRestSchema = (userInput) => {
    return validation(RestSchema, userInput);
}

export default validateRestSchema;
