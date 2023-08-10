const getLabel = (label) => {
    let newLabel = "";
    let arrUppCase = [];
    for (let i = 0; i < label.length; i++) {
        //store the index of uppCase characters
        if (label[i] === label[i].toUpperCase()) {
            arrUppCase.push(i);
        }
    }
    let prevIndex = 0;
    for (let i = 0; i < arrUppCase.length; i++) {
        //build new str : add " "before uppCase & conver char to lowCase
        newLabel +=
            label.slice(prevIndex + 1, arrUppCase[i]) +
            " " +
            label[arrUppCase[i]].toLowerCase();
        prevIndex = arrUppCase[i];
    }
    newLabel += label.slice(arrUppCase[arrUppCase.length - 1] + 1); //add the last segment of str(after the last uppCase char)
    return arrUppCase.length === 0 ? label : label[0] + newLabel;
};

export default getLabel;