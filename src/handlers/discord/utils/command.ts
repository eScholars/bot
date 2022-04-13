import { Interaction } from "discord.js";
import { eScholar } from "../../../structs/discord/client";

export interface Command {
    name: string,
    description: string,
    discord: {
        name: string,
        description: string,
        options?: [{
            type: number,
            name: string,
            description: string,
            required: boolean,
        }]
    }
    execute(client: eScholar, interaction: Interaction): void
}