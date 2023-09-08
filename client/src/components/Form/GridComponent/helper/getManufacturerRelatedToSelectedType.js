import typeSelection from "./typeSelection";

const getManufacturerRelatedToSelectedType = (type) => {
    for (const [key, value] of Object.entries(typeSelection)) {
        for (const element of value) {
            if (element.label === type) return key;
        }
    }
    return "";
};
export default getManufacturerRelatedToSelectedType;