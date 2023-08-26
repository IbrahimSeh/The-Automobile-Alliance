import Communications from "../SaleCarForm/Communications";
import Engine from "../SaleCarForm/Engine";
import ManufacturerData from "../SaleCarForm/ManufacturerData";
import Address from "../SaleCarForm/Address";
import Image from "../SaleCarForm/Image";
import Rest from "../SaleCarForm/Rest";
import SendRequest from "../SaleCarForm/SendRequest";
const manufacturerData = {
    manufacturer: "",
    type: "",
    subType: "",
}
const communicationsData = {
    phone: "",
    email: "",
}
const engineData = {
    engineType: "",
    fuelType: "",
}
const addressData = {
    state: "",
    country: "",
    city: "",
    street: "",
}
const imageData = {
    src: [],
    alt: [],
}
const restData = {
    previousOwners: "",
    kilometers: "",
    yearOfProduction: "",
}

const returnManufacturerData = (inputKey, inputValue) => { manufacturerData[inputKey] = inputValue }
const returnCommunicationsData = (inputKey, inputValue) => { communicationsData[inputKey] = inputValue }
const returnEngineData = (inputKey, inputValue) => { engineData[inputKey] = inputValue }
const returnAddressData = (inputKey, inputValue) => { addressData[inputKey] = inputValue }
const returnImageSrcData = (inputKey, inputValue) => { imageData[inputKey] = inputValue }
const returnImageAltData = (inputKey, inputValue) => { imageData[inputKey] = inputValue }
const returnRestData = (inputKey, inputValue) => { restData[inputKey] = inputValue }

const arrPaginationComponent = [];
arrPaginationComponent[0] = <ManufacturerData passData={returnManufacturerData} />;
arrPaginationComponent[1] = <Communications passData={returnCommunicationsData} />
arrPaginationComponent[2] = <Engine passData={returnEngineData} />
arrPaginationComponent[3] = <Address passData={returnAddressData} />
arrPaginationComponent[4] = <Image passSrcData={returnImageSrcData} passAltData={returnImageAltData} />
arrPaginationComponent[5] = <Rest passData={returnRestData} />
arrPaginationComponent[6] = <SendRequest />

export { arrPaginationComponent, manufacturerData, communicationsData, engineData, addressData, imageData, restData };