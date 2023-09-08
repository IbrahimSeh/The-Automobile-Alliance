import typeSelectionStringArr from "./typeSelectionStringArr";

const getTypeSelectionStringArr = (manufacturerArr) => {
    let arrOfTypeRelatedToManufacturer = [];
    for (const carManufacturer of manufacturerArr) {
        arrOfTypeRelatedToManufacturer = arrOfTypeRelatedToManufacturer.concat(typeSelectionStringArr[carManufacturer]);
    }

    return arrOfTypeRelatedToManufacturer;
}
export default getTypeSelectionStringArr;