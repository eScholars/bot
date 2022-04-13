import { Interaction, MessageEmbed } from "discord.js";
import { eScholar } from "../../../../structs/discord/client";
import { Command } from "../../utils/Command";

const Lesson: Command = {
    name: "lesson",
    description: "Query for a lesson",
    discord: {
        name: "lesson",
        description: "Returns with data about a lesson",
        options: [
            {
                name: 'id',
                description: 'id of lesson',
                type: 3,
                required: true,
            },
        ],
    },
    execute: async (client: eScholar, interaction: Interaction) => {
        if (!interaction.isApplicationCommand()) return;
        

        let id = interaction!.options!.get("id")!.value!.toString();

        console.log(id)
        
        let d = await client.prisma.videos.findFirst({ where: { video: id }, include: { author: true } });

        if (!d) { interaction.reply({ content: "Unkown lesson id!", ephemeral: true })}

        let emb = new MessageEmbed().setColor("BLURPLE").setImage(`https://escholar.me/api/videos/thumbnail?id=${d!.video}&size=1280`).setDescription(d!.title).setAuthor({ name: `${d!.author!.firstname } ${d!.author!.surname}`, url: `https://escholar.me/v?id=${d!.video}`, iconURL: `https://escholar.me/api/users/avatars?id=${d!.author.username}`}).setFooter({ text: "eScholar", iconURL: "https://escholar.me/cdn/images/logo.png"}).setTimestamp();

        interaction.reply({ embeds: [emb] });

    }

}

export default Lesson;