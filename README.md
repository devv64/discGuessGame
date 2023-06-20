# Discord Bot Usage Guide

## Installation

1. Make sure you have Node.js installed on your machine.
2. Navigate to the directory where the bot code is located using the command line.
3. Run the following command to install the Discord.js library:

```bash
npm install discord.js
```

## Configuration

1. Create a file named `config.json` in the same directory as the bot code.
2. Inside `config.json`, add the following JSON structure:

```json
{
  "TOKEN": "your_discord_bot_token"
}
```

3. Replace `your_discord_bot_token` with the token of your Discord bot. You can find this token in the Discord Developer Portal.

## Prepare Messages

1. Create a file named `messages.txt` in the same directory as the bot code.

2. Each line in `messages.txt` should contain a message in the following format:

```
author_name: message_content
```

3. Replace `author_name` with the name of the author of the message, and replace `message_content` with the content of the message. Each line should contain only one message.

**Note:** It is recommended to use devv64's discord message scraper to scrape messages from a Discord server and keep the proper format. You can find the scraper here: https://github.com/devv64/discMsgScript

## Run the Bot

1. Navigate to the directory where the bot code is located using the command line.

2. Run the following command to start the bot:

```bash
node bot.js
```

3. The bot will log a message saying "Bot is ready!" when it is successfully connected to Discord.

## Interacting with the Bot

1. Invite the bot to your Discord server using the OAuth2 URL generated on the Discord Developer Portal.

2. In a text channel of your server, use the following command to start a game:

```css
!sg [num_questions] [time_per_question]
```

- `[num_questions]` (optional): The number of questions to ask in the game. Default is 10.
- `[time_per_question]` (optional): The time limit in seconds for each question. Default is 10 seconds.

3. The bot will randomly select a message from the messages.txt file and ask you who sent it.

4. Respond to each question by typing the name of the message author.

5. The bot will let you know if your answer is correct or incorrect.

6. After the specified number of questions, the game will finish.

**Note:** Make sure the bot has the necessary permissions to read and send messages in the text channels where you want to use it.