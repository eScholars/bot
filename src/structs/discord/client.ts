import { Client, Intents } from "discord.js";
import { connection } from "../../handlers/websocket/connections";

import wsp from "ws";
import { Event } from "../types/event";
import { loadCommands, loadEvents } from "../../handlers/discord/utils/loader";
import { Command } from "../../handlers/discord/utils/Command";
import { prisma } from "../../handlers/db/db";

export class eScholar extends Client {
    private opts: any;
    public commands: Map<string, Command> = new Map();
    public prisma = prisma;

    public wss: wsp.Server = new wsp.Server({ port: 8001 }).on("connection", async(ws) => connection(ws, this));
    constructor(opts?: any) { super({ intents: [`GUILD_MEMBERS`, `GUILD_MESSAGES`, `GUILDS`] }); this.opts = opts; }

    start() {
        super.login(process.env.token);
        loadEvents(this);
        loadCommands(this);
        this.guilds.fetch("960460387222970428");
    }
}