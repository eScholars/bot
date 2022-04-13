import { eScholar } from "../../../structs/discord/client";

import glob from "glob";
import path from "path";

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