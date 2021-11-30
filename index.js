"use strict";
// import discord DONT TOUCH THIS
import Discord from "discord.js"

// setup intents DONT TOUCH THIS
const client = new Discord.Client({
  intents: [ "GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING" ]
})

// import config
import { config } from "./config.js";

// login bot
client.login(config.token)

// import launge file
import { messages } from "./launge.js"

// check configuration
if (config.token == "BOT_TOKEN") {
  console.log("SET YOUR BOT TOKEN IN CONFIG.JS!!")
  process.exit(0)
}
let logChannel = {}

// When it ready
client.on("ready", async() => {
  console.log(`Logged in as ${client.user.tag}`)
  if (config.logging.isEnabled) {
  if ( config.logging.ChannelID == "CHANNEL_ID") {
    console.log("SETUP LOGGING.CHANNELID IN CONFIG.JS!!")
    process.exit(0)
  } else {
    logChannel = await client.channels.fetch(`${config.logging.ChannelID}`)
   }
}
})
function isBan(words, text) {
  const chk = text.toLowerCase()
  for (const word in words) {
    if (chk.includes(word)) {
      return true
      break
    } else {
     continue 
    }
  }
  return false
}
//Invite block
client.on("messageCreate", message => {
  const content = message.content.toLowerCase()
  const banwords = ['discord.gg/', 'discord.com/invite', 'discordapp.com/invite']
  
  if (!message.member.roles.cache.hasAny(...config.immuneRoles) && isBan(banwords, content)) {
    function placeholderReplace(text) {
    return text.replaceAll(`{user}`, `<@${message.author.id}>`)
               .replaceAll(`{channel}`, `<#${message.channel.id}>`)
               .replaceAll(`{guild}`, `${message.guild.name}`)
               .replaceAll(`{botAvatar}`, `${client.user.displayAvatarURL()}`)
               .replaceAll(`{guildIcon}`, `${message.guild.iconURL()}`)
               .replaceAll(`{userAvatar}`, `${message.author.displayAvatarURL()}`)
               .replaceAll(`{content}`, `${message.content}`)
  }
    message.channel.send(placeholderReplace(messages.deleteAlert)).then(m => setTimeout(function () { m.delete() }, 15000))
    message.delete()
    if (config.logging.isEnabled) {
      if (config.logging.isEmbed) {
        
        var logEmbedOptions = {
          title: placeholderReplace(messages.logging.embed.title),
          description: placeholderReplace(messages.logging.embed.description),
          color: messages.logging.embed.color,
          footer: {
            text: placeholderReplace(messages.logging.embed.footer.text)
          }
        }
        if (messages.logging.embed.timestamp = true) {
          logEmbedOptions.timestamp = ``
        }
        if (messages.logging.embed.footer.imageEnabled) {
          logEmbedOptions.footer.iconURL = placeholderReplace(messages.logging.embed.footer.image)
        }
        var logEmbed = new Discord.MessageEmbed(logEmbedOptions)
        logChannel.send({ embeds: [ logEmbed ] })
      } else {
        logChannel.send(placeholderReplace(messages.logging.noEmbed))
      }
    }
  }
})
