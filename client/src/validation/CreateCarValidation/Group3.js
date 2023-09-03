const Group3 = (manufacturerSelected, type, fuelType) => {
    let msgValidationArr = [];
    if (manufacturerSelected === "ALL")
        msgValidationArr[0] = "manufacturerSelected is required"

    if (type === "")
        msgValidationArr[1] = "type is required"

    if (fuelType === "")
        msgValidationArr[2] = "fuelType is required"

    return msgValidationArr;
}
export default Group3;