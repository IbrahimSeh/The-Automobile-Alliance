import Communications from "../OfferedYourCarToSale/Communications";
import Engine from "../OfferedYourCarToSale/Engine";
import ManufacturerData from "../OfferedYourCarToSale/ManufacturerData";
import Address from "../OfferedYourCarToSale/Address";
import Image from "../OfferedYourCarToSale/Image";
import Rest from "../OfferedYourCarToSale/Rest";
import SendRequest from "../OfferedYourCarToSale/SendRequest";
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
    previousOwners: 0,
    kilometers: 0,
    yearOfProduction: "2022",
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
arrPaginationComponent[1] = <Communications passData={returnCommunicationsData} prevState={communicationsData} />
arrPaginationComponent[2] = <Engine passData={returnEngineData} />
arrPaginationComponent[3] = <Address passData={returnAddressData} prevState={addressData} />
arrPaginationComponent[4] = <Image passSrcData={returnImageSrcData} passAltData={returnImageAltData} />
arrPaginationComponent[5] = <Rest passData={returnRestData} prevState={restData} />
arrPaginationComponent[6] = <SendRequest />

export { arrPaginationComponent, manufacturerData, communicationsData, engineData, addressData, imageData, restData };