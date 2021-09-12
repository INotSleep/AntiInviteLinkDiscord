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

// check configuration
if (config.token == "BOT_TOKEN") {
  console.log("SET YOUR BOT TOKEN IN CONFIG.JS!!")
  process.exit(0)
}

if (config.logginEnabled) {
  if ( config.logChannelID == "CHANNEL_ID" || config.logGuildID == "GUILD_ID") {
    console.log("SETUP LOGCHANNELID AND LOGGUILDID IN CONFIG.JS!!")
    process.exit(0)
  } else {
    let logChannel = client.guilds.cache.get(config.logGuildID).channels.cache.get(config.logChannelID)
  }
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
    if (config.loggingEnabled) {
      if (config.loggingIsEnabled) {
        logChannel.send({ embeds: [ new Discord.MessageEmbed() ] })
      } else {
        logChannel.send()
      }
    }
  }
})

client.login(config.token)
