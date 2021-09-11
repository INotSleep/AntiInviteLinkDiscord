// import discord
import Discord from "discord.js"
// setup intents
const client = new Discord.Client({
  intents: [ "GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_BANS", "GUILD_EMOJIS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING" ]
})
// import config
import { token, immuneRoles } from "./config.js";
// check bot token
if ( token == "BOT_TOKEN") {
  console.log("SET YOUR BOT TOKEN IN CONFIG.JS!!")
  process.exit(0)
}

// When it ready
client.on("ready", () => {
  console.log(`Logined as ${client.user.tag}`)
})

//Invite block
client.on("messageCreate", function() {
if (this.member.roles.has(immuneRoles) && this.content.includes("discord.gg/") || this.content.includes("discordapp.com/invite") || this.content.includes("discord.com/invite")) {
  this.channel.send(`<@${this.author.id}>, invite links is not allowed!`).then(m => m.delete({ timeout: 15000 }))
  //                                       Here ^^^^ change your message. <@${this.author.id}> - ping user
  this.delete()
}
})

client.login(token)
