const config = require("./config.json");
const fetch = (...args) =>
    import("node-fetch")
        .then(({ default: fetch }) => fetch(...args))
        .catch((err) => console.log(err));


fetch(config.discord.loggingWebhook, {
    body: JSON.stringify({
        content: `aaaaaaaaaaaaaaa`,
    }),
    headers: {
        "Content-Type": "application/json",
    },
    method: "POST",
})