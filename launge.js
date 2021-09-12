// setup data
const messages = {}

messages.deleteAlert = `{user}, invite links are not allowed!`

messages.logging.embed.title = `Invite link was posted`
messages.logging.embed.field1.name = `User:`
messages.logging.embed.field1.value = `{user}`
messages.logging.embed.field2.name = `Channel:`
messages.logging.embed.field2.value = `{channel}`
messages.logging.embed.field3.name = `Content:`
messages.logging.embed.field3.value = `{content}`
messages.logging.embed.footer.text = `AntiInviteLinkDiscord`
messages.logging.embed.footer.imageEnabled = true
messages.logging.embed.footer.image = `{botAvatar}`
messages.logging.embed.timestamp = true

messages.logging.noEmbed = `User:\n{user}\nChannel:\n{channel}\nContent:\n{content}`

// export data
export { messages }
