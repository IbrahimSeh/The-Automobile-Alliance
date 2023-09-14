const createData = (carsArrFromHome) => {
    let rows = [];

    for (const car of carsArrFromHome) {
        rows = [...rows, {
            id: car._id,
            manufacturer: car.manufacturerData.manufacturer,
            type: car.manufacturerData.type,
            yearOfProduction: car.yearOfProduction,
            previousOwners: car.previousOwners,
            phone: car.communications.phone,
            likes: car.likes,
        }]
    }
    return rows;
}
export default createData;
