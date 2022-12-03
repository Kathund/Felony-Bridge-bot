const axios = require("axios");

async function getUUID(username) {
    const fetch = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`)
    return fetch.data.id
}

async function getUsername(uuid) {
    const fetch = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
    return fetch.data.name
}

module.exports = { getUUID, getUsername };
