import Joi from "joi";

import validation from "../validation";

const createCarSchemaGroup2 = Joi.object({
    previousOwners: Joi.number().min(0).max(300).required(),
    kilometers: Joi.number().min(0).max(2000000).required(),
});

const Group1 = (userInput) => {
    return validation(createCarSchemaGroup2, userInput);
}

export default Group1;
