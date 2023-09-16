const updateSelectedImage = (event, updateSelectedAlt, updateSelectedUrl) => {
    let tempalt = [];
    if (event.target.files[0]) tempalt[0] = event.target.files[0].name;
    if (event.target.files[1]) tempalt[1] = event.target.files[1].name;
    if (event.target.files[2]) tempalt[2] = event.target.files[2].name;
    updateSelectedAlt(tempalt);
    let tempurl = [];
    const reader = new FileReader();
    const reader1 = new FileReader();
    const reader2 = new FileReader();
    reader.onloadend = () => (tempurl[0] = reader.result);
    reader1.onloadend = () => (tempurl[1] = reader1.result);
    reader2.onloadend = () => (tempurl[2] = reader2.result);
    if (event.target.files[0]) reader.readAsDataURL(event.target.files[0]);
    if (event.target.files[1]) reader1.readAsDataURL(event.target.files[1]);
    if (event.target.files[2]) reader2.readAsDataURL(event.target.files[2]);
    updateSelectedUrl(tempurl);
};

export default updateSelectedImage;