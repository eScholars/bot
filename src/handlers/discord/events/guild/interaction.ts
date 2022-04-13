import { Interaction } from "discord.js";
import { eScholar } from "../../../../structs/discord/client";

export const event = (client: eScholar) => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (!interaction.isCommand()) return;

        let command = client.commands.get(interaction.commandName);
        if (!command) interaction.reply({ content: "Unkown command", ephemeral: true });

        try { await command!.execute(client, interaction); } catch (err) { console.log(err); }
    })
}

export const name = "interaction";