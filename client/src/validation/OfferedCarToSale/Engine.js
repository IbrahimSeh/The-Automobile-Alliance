import Joi from "joi";

import validation from "../validation";

const EngineSchema = Joi.object({
    engineType: Joi.string().min(2).max(256).required(),
    //fuelType: Joi.string().required(),
});

const validateEngineSchema = (userInput) => {
    return validation(EngineSchema, userInput);
}

export default validateEngineSchema;
