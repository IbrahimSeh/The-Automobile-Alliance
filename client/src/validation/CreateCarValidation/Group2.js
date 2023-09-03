import Joi from "joi";

import validation from "../validation";

const createCarSchemaGroup2 = Joi.object({
    previousOwners: Joi.number().max(3000).required(),
    kilometers: Joi.number().max(2000000).allow(null, ''),
});

const Group1 = (userInput) => {
    return validation(createCarSchemaGroup2, userInput);
}

export default Group1;
