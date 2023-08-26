const getType = (inputKey) => {
    switch (inputKey) {
        case "email":
            return "email";
        case "password":
            return "password";
        default:
            return "text";
    }
};
export default getType;