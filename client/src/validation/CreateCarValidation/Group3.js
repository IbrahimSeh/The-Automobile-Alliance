const Group3 = (manufacturer, type, fuelType) => {
    let msgValidationArr = [];
    if (manufacturer === "ALL" || manufacturer === "")
        msgValidationArr[0] = "manufacturer is required"

    if (type === "")
        msgValidationArr[1] = "type is required"

    if (fuelType === "")
        msgValidationArr[2] = "fuelType is required"

    return msgValidationArr;
}
export default Group3;