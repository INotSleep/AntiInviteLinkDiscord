// setup data
const messages = {
  deleteAlert: `{user}, invite links are not allowed!`,
  logging: {
    embeds: {
      messageSendEmbed: {
		title: `Invite link was posted`,
		description: `User:\n{user}\nChannel:\n{channel}\nContent:\n{content}`,
		footer: {
		  text: `AntiInviteLinkDiscord`,
		  iconURL: `{botAvatar}`
		},
		timestamp: `{timeNow}`
      },
	  messageEditEmbed: {
		title: `Invite link was posted in edited message`,
		description: `User:\n{user}\nChannel:\n{channel}\nContent:\n{content}`,
		footer: {
		  text: `AntiInviteLinkDiscord`,
		  iconURL: `{botAvatar}`
		},
		timestamp: `{timeNow}`
      }
    },
    noEmbed: `User:\n{user}\nChannel:\n{channel}\nContent:\n{content}`
  }
}

// export data
export { messages }
