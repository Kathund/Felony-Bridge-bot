const { getUUID } = require("../../src/contracts/API/MojangAPI.js");
const { parseHypixel } = require("../utils/hypixel.js");
const { isUuid } = require("../utils/uuid.js");
const config = require("../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

async function getLatestProfile(uuid) {
  try {
    if (!isUuid(uuid)) {
      try {
        uuid = await getUUID(uuid);
      } catch (error) {
        return error.response.data;
      }
    }
    
    fetch(`https://api.hypixel.net/player?key=${config.api.hypixelAPIkey}&uuid=${uuid}`).then((res) => res.json()).then((playerRes) => {
      fetch(`https://api.hypixel.net/skyblock/profiles?key=${config.api.hypixelAPIkey}&uuid=${uuid}`).then((res) => res.json()).then((profileRes) => {

        const player = parseHypixel(playerRes, uuid);

        if (!profileRes.profiles) {
          return {
            status: 404,
            reason: `Found no SkyBlock profiles for a user with a UUID of '${uuid}'.`,
          };
        }

        const profileData = profileRes.profiles.find((a) => a.selected);
        const profile = profileData.members[uuid];

        return {
          profile: profile,
          profileData: profileData,
          playerRes: playerRes,
          player: player,
          uuid: uuid,
        };
      });
    });
  } catch (error) {
    console.log(error);
    return { status: 404, reason: error };
  }
}

module.exports = { getLatestProfile };