import Joi from "joi";

import validation from "../validation";

const manufacturerDataSchema = Joi.object({
    subType: Joi.string().max(256).allow(null, ''),
});

const validateManufacturerDataSchema = (userInput) => {
    return validation(manufacturerDataSchema, userInput);
}

export default validateManufacturerDataSchema;
