// setup data
const messages = {
  deleteAlert: `{user}, invite links are not allowed!`,
  logging: {
    embed: {
      title:  `Invite link was posted`,
      description: `User:\n{user}\nChannel:\n{channel}\nContent:{content}`,
      footer: {
        text: `AntiInviteLinkDiscord`,
        imageEnabled: true,
        image: `{botAvatar}`
      },
      timestamp: true,
      color: `#ffffff`
    },
    noEmbed: `User:\n{user}\nChannel:\n{channel}\nContent:\n{content}`
  }
}

// export data
export { messages }
