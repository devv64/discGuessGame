const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { TOKEN } = require('./config.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});
const prefix = '!';
const file = 'messages.txt';

let messages = [];

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('messageCreate', (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) {
    // console.log('Message is from a bot or does not start with prefix.');
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'sg') {

    const numQuestions = args.length > 0 ? parseInt(args[0]) : 10;
    if (numQuestions <= 0) {
      message.channel.send('Please provide a positive number of questions.');
      return;
    }

    const time = args.length > 1 ? parseInt(args[1]) * 1000 : 10000;

    console.log(`Starting game with ${numQuestions} questions and ${time/1000}s per question...`);
    if (messages.length === 0) {
      loadMessages();
    }

    const playGame = (questionsRemaining) => {
      if (questionsRemaining === 0) {
        message.channel.send('Game finished!');
        return;
      }
      
      console.log(messages.length)
      const randomIndex = Math.floor(Math.random() * messages.length);
      const randomMessage = messages[randomIndex];

      console.log(`Question ${numQuestions - questionsRemaining + 1}: Who said the following message?\n${randomMessage.content}`);
      console.log(`Answer: ${randomMessage.author}`);
      message.channel.send(`Question ${numQuestions - questionsRemaining + 1}: Who said the following message?\n\`${randomMessage.content}\``);

      const filter = (response) => {
        return response.author.id === message.author.id;
      };

      const collector = message.channel.createMessageCollector({ filter, max: 1, time });

      collector.on('collect', (collected) => {
        const userGuess = collected.content.toLowerCase();

        if (userGuess === randomMessage.author.toLowerCase()) {
          message.channel.send(`Correct! ${message.author} guessed it right!`);
        } 
        else {
          message.channel.send(`Incorrect! The message was actually sent by ${randomMessage.author}.`);
        }

        playGame(questionsRemaining - 1);
      });

      collector.on('end', (collected, reason) => {
        if (reason === 'time') {
          message.channel.send(`Time's up! The message was sent by ${randomMessage.author}.`);
          playGame(questionsRemaining - 1);
        }
      });
    };

    playGame(numQuestions);
  }
});

function loadMessages() {
  try {
    const data = fs.readFileSync(file, 'utf8');
    messages = data.trim().split('\n').map((line) => {
      const [author, content] = line.split(': ');
      return { author, content };
    });
  } catch (error) {
    console.error('Error occurred while reading the messages file:', error);
  }
}

client.login(TOKEN);
