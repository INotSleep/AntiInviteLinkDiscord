# AntiInviteLinkDiscord

Source code of AntiInviteLink discord bot.

## Installation
### Heroku

1. Download source code
2. Create **private** repository
3. Upload files
4. Connect repository to heroku
5. Done!

### VPS or other

1. Download source code
2. Install Node.js v16.3.0
3. Run command `npm install`, it will install all required packages.
4. Done! You can run the bot with command `node index.js` in bot directory.

## Configuration

* Open config.js and change `BOT_TOKEN` to your Bot token. 
* Also in config.js in `immuneRoles` add id of roles, that can send invite links, like `[ "id1", "id2", ... "idn"  ]`. 
* You can enable logging in `logging.isEnabled`.
* You can make log message embed or simple text. (`logging.isEmbed`)
* If logging enabled, put in `ChannelId` id of channel to log in.

## Messages

* You can change **ALL** messages of this bot.
* Delete alert message: you can change it in launge.js: `deleteAlert`
* You can change **ALL** messages in embed in launge.js: `logging.embed`
* If you dont want to use embed - change log message when no embed in launge.js: `logging.noEmbed` 

## Placeholders

* `{user}` will be replaced to user mention
* `{channel}` will be replaced to channel mention
* `{guild}` will be replaced to guild name
* `{botAvatar}` will be replaced to bot avatar link (it used in footer image)
* `{guildIcon}` will be replaced to guild icon link
* `{userAvatar}` will be replaced to user avatar link (user who trigered message event)
* `{content}` will be replaced to message content

#
