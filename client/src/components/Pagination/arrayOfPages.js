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

const returnManufacturerData = (inputKey, inputValue) => { manufacturerData[inputKey] = inputValue }
const returnCommunicationsData = (inputKey, inputValue) => { communicationsData[inputKey] = inputValue }
const returnEngineData = (inputKey, inputValue) => { engineData[inputKey] = inputValue }

const arrPaginationComponent = [];
arrPaginationComponent[0] = <ManufacturerData passData={returnManufacturerData} />;
arrPaginationComponent[1] = <Communications passData={returnCommunicationsData} />
arrPaginationComponent[2] = <Engine passData={returnEngineData} />
arrPaginationComponent[3] = <Address />
arrPaginationComponent[4] = <Image />
arrPaginationComponent[5] = <Rest />
arrPaginationComponent[6] = <SendRequest />

export { arrPaginationComponent, manufacturerData, communicationsData, engineData };