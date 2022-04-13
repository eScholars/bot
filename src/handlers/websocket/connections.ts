import wsp from "ws";

import { MessageEmbed, WebhookClient } from "discord.js";
import { eScholar } from "../../structs/discord/client";

const webhook = new WebhookClient({ url: "https://discord.com/api/webhooks/963284670936662026/EUFFJ0B1CqtEUjppKWzVXB831zTe4sS3DcEpyJnB2obCvRc6l537vGG3Nu4Ux2x57yId"})

export let connection = (ws: wsp.WebSocket, client: eScholar) => {
    ws.on('message', async (data: any) => {
        let msg = JSON.parse(data.toString());
        if (!msg.command) return; // Ignore message
        switch (msg.command) {
            case 1:
                // Authenticate user
                if (!msg.data.id || !msg.data.username) return ws.send("bad request")
                let usr = client.guilds.cache.get("960460387222970428")!.members.cache.get(msg.data.id);
                if (!usr) usr = await client.guilds.cache.get("960460387222970428")!.members.fetch(msg.data.id);

                if (!usr) return ws.send("invalid user!");

                usr.roles.add("961195595710750731"); // Verified role!
                console.log(`Verified ${msg.data.username}`);

                const embed = new MessageEmbed().setColor("BLURPLE").setDescription(`**[${msg.data.username}](https://escholar.me/users/@me)** just authenticated!`)

                webhook.send({ embeds: [ embed ] })

                break;
            default:
                break; // ignore.
        }
    })
}