const checkIfRequired = (inputKey) => {
    switch (inputKey) {
        case "middleName":
            return false;
        case "state":
            return false;
        case "zip":
            return false;
        case "web":
            return false;
        case "email":
            return false;
        case "url":
            return false;
        case "alt":
            return false;
        case "subType":
            return false;
        default:
            return true;
    }
};
export default checkIfRequired;