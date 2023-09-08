import getManufacturerRelatedToSelectedType from "../../Form/GridComponent/helper/getManufacturerRelatedToSelectedType";

const checkIfManufacturerExist = (manufacturerArr, typeArr) => {
    let newTypeArr = [];
    let manufacturer;
    for (const type of typeArr) {
        manufacturer = getManufacturerRelatedToSelectedType(type);
        if (manufacturer !== "") {
            if (manufacturerArr.includes(manufacturer)) {
                newTypeArr = [type, ...newTypeArr]
            }
        }
    }

    return newTypeArr;
}
export default checkIfManufacturerExist;