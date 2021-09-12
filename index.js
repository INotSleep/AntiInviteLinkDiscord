use strict
// import discord DONT TOUCH THIS
import Discord from "discord.js"
// setup intents DONT TOUCH THIS
const client = new Discord.Client({
  intents: [ "GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_BANS", "GUILD_EMOJIS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING" ]
})
// import config
import { config } from "./config.js";
// import launge file
import { messages } from "./launge.js"
// check bot token
if ( config.token == "BOT_TOKEN") {
  console.log("SET YOUR BOT TOKEN IN CONFIG.JS!!")
  process.exit(0)
}

// When it ready
client.on("ready", () => {
  console.log(`Logined as ${client.user.tag}`)
})

//Invite block
client.on("messageCreate", function() {
if (!this.member.roles.cache.has(config.immuneRoles) && (this.content.includes("discord.gg/") || this.content.includes("discordapp.com/invite") || this.content.includes("discord.com/invite"))) {
  this.channel.send(messages.deleteAlert.replaceAll(`{user}`, `<@${this.user.id}>`).replaceAll(`{channel}`, `<#${this.channel.id}>`).replaceAll(`{guild}`, `${this.guild.name}`)).then(m => m.delete({ timeout: 15000 }))
  this.delete()
}
})

client.login(config.token)
