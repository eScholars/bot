import { eScholar } from "../../../structs/discord/client";

import glob from "glob";
import path from "path";
import { Command } from "./Command";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

export let loadEvents = async (client: eScholar) => {
    let files = [];
    files.push(...glob.sync("./handlers/discord/events/**/*.ts"));

    if (!files) return console.log('no events found');

    for (let file of files) {
        try {
            file = path.join(__dirname, "../../../" + file);
            if (require.cache[require.resolve(file)]) delete require.cache[require.resolve(file)];
            
            let tmp = require(file);
            tmp.event(client);
            console.log(`loaded ${tmp.name} event`)
        } catch (err) {
            console.log(err)
        }
    }
}

export const loadCommands = async (client: eScholar) => {
    const rest = new REST({ version: "9" }).setToken(process.env.token!)
    
    const commands: Array<any> = [];
    const files: Array<string> = [];

    client.commands = new Map();
    
    
    files.push(...glob.sync("./handlers/discord/commands/**/*.ts"))
    if(!files) return console.log("No commands found!");

    for (let file of files) {
        try {
            file = path.join(__dirname, `../../../${file}`);
            if (require.cache[require.resolve(file)]) delete require.cache[require.resolve(file)];

            let command = require(file);

            client.commands.set(command.default.name, command.default);
            commands.push(command.default.discord);



            console.log(`Loaded ${command.default.name} command`);

            await rest.put(
                Routes.applicationGuildCommands("963287081935855666", "960460387222970428"),
                { body: commands },
            );



        } catch (err) { console.log(err) };
    }
}