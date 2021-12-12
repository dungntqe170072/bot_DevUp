const { Client, Intents } = require("discord.js");

const {token} = require("../config.json");
const commands = require("./commands");
const invite = require("./models/invite");
const welcome = require("./models/welcome");
const {connect} = require('./service/mongo'); 

const client = new Client({
     intents: [
          Intents.FLAGS.GUILDS,
          Intents.FLAGS.DIRECT_MESSAGES,
          Intents.FLAGS.GUILD_MESSAGES,
          Intents.FLAGS.GUILD_INVITES,
          Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
          Intents.FLAGS.GUILD_MEMBERS
     ]
})

client.once('ready', client => {
     console.log(`Bot ${client.user.tag} are ready!`);
})

client.login(token)
     .then(async () => {
          let guilds = await client.guilds.fetch();

          commands(client);
          welcome(client);
          invite.event(client);
          await connect();
          guilds.map(async guild => {
               await invite.syncInvite(await guild.fetch());
          })
     })