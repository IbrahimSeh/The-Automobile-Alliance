import Communications from "../SaleCarForm/Communications";
import Engine from "../SaleCarForm/Engine";
import ManufacturerData from "../SaleCarForm/ManufacturerData";
import Address from "../SaleCarForm/Address";
import Image from "../SaleCarForm/Image";
import Rest from "../SaleCarForm/Rest";


const arrPaginationComponent = [];
arrPaginationComponent[0] = <ManufacturerData />;
arrPaginationComponent[1] = <Communications />
arrPaginationComponent[2] = <Engine />
arrPaginationComponent[3] = <Address />
arrPaginationComponent[4] = <Image />
arrPaginationComponent[5] = <Rest />

export default arrPaginationComponent;