const validateSelectedField = (manufacturerSelected, type, fuelType) => {
    let msgValidationArr = [];
    if (manufacturerSelected === "ALL")
        msgValidationArr[0] = "manufacturerSelected is required"

    if (type === "")
        msgValidationArr[1] = "type is required"

    if (fuelType === "")
        msgValidationArr[2] = "fuelType is required"

    return msgValidationArr;
}
const validateOwnersAndKm = (previousOwners, kilometers) => {
    let msgValidationArr = {
        previousOwners: "",
        kilometers: "",
    };
    if (previousOwners < 0 || previousOwners > 300) msgValidationArr.previousOwners = "the number of previous Owners must be between 0 & 300";
    if (kilometers < 0 || kilometers > 2000000) msgValidationArr.kilometers = "the number of kilometers must be between 0 & 2000000";
    return msgValidationArr;
}
export { validateSelectedField, validateOwnersAndKm };