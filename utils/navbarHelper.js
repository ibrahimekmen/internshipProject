const utilServices = require("../services/utilServices.js");

async function getWomenNavbar(){
    const womenNavbarData = await utilServices.getWomenNavbar();
    return womenNavbarData;
}

async function getMenNavbar(){
    const menNavbarData = await utilServices.getMenNavbar();
    return menNavbarData;
}

module.exports = {
    getWomenNavbar : getWomenNavbar,
    getMenNavbar : getMenNavbar
}