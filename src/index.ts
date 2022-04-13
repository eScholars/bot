require('dotenv').config();

import { eScholar } from "./structs/discord/client";

const client = new eScholar();
client.start();