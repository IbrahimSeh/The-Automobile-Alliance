const createMsgDialog = (resultfromGroup3, resultfromGroup1) => {
    if (resultfromGroup1 === null) return resultfromGroup3;
    for (const [key, value] of Object.entries(resultfromGroup1)) {
        for (const msg of value) {
            resultfromGroup3.push(msg);
        }
    }
    return resultfromGroup3;
}
export default createMsgDialog;