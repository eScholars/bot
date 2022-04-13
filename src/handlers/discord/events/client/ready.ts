import { eScholar } from "../../../../structs/discord/client"

export const event = (client: eScholar) => {
    client.on("ready", () => console.log(`${client.user!.username} is ready!`))
}

export const name = "ready"
