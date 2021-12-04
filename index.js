"use strict";
// import discord DONT TOUCH THIS
import { Client, MessageEmbed } from "discord.js"

// setup intents DONT TOUCH THIS
const client = new Client({
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

//Functions
function isBan(words, text) {
  const chk = text.toLowerCase()
  for (const word of words) {
    if (chk.includes(word)) {
      return true
      break
    } else {
     continue 
    }
  }
  return false
}

Array.prototype.replaceAll = function(find, replace) {
  var rArr = this;
  for(const value of rArr) {
  if (typeof value !== "string" && typeof value !== "object") return;
  if (value == null || value == undefined) return;
  rArr[rArr.indexOf(value)] = value.replaceAll(find, replace)
  }
  return rArr;
}

Object.prototype.replaceAll = function(find, replace) {
  var rObj = this;
  for(const [key, value] of Object.entries(rObj)) {
    if(typeof value !== "string" && typeof value !== "object" && typeof value !== "array") return;
    if(value == null || value == undefined) return;
    rObj[key] = value.replaceAll(find, replace);
  }
  return rObj;
}

//Invite block
client.on("messageCreate", message => { 
  if (!message.member.roles.cache.hasAny(...config.immuneRoles) && isBan(config.banwords, message.content)) {
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
    if (config.logging.isEnabled) {
      if (config.logging.isEmbed) {
         var embed = placeholderReplace(messages.embeds.messageSendEmbed)
      } else {
        logChannel.send(placeholderReplace(messages.logging.noEmbed))
      }
    }
	message.delete()
  }
})

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (!newMessage.member.roles.cache.hasAny(...config.immuneRoles) && isBan(config.banwords, newMessage.content)) {
    function placeholderReplace(text) {
    return text.replaceAll(`{user}`, `<@${newMessage.author.id}>`)
               .replaceAll(`{channel}`, `<#${newMessage.channel.id}>`)
               .replaceAll(`{guild}`, `${newMessage.guild.name}`)
               .replaceAll(`{botAvatar}`, `${client.user.displayAvatarURL()}`)
               .replaceAll(`{guildIcon}`, `${newMessage.guild.iconURL()}`)
               .replaceAll(`{userAvatar}`, `${newMessage.author.displayAvatarURL()}`)
               .replaceAll(`{content}`, `${newMessage.content}`)
  }
    if (config.logging.isEnabled) {
      if (config.logging.isEmbed) {
	  var embed = placeholderReplace(messages.embeds.messageEditEmbed)
	  logChannel.send({embeds: [embed]})
      } else {
        logChannel.send(placeholderReplace(messages.logging.noEmbed))
      }
    }
	newMessage.delete()
  }
  }
})
