import { Message } from "discord.js"
import { eScholar } from "../../../../structs/discord/client"

export const event = (client: eScholar) => {
    client.on("messageCreate", (message: Message) => console.log(message.content))
}

export const name = "message"
