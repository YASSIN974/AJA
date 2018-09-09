const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
client.on("ready", () => {
console.log('hello again bitch');
 console.log(`Logged in as ${client.user.tag}!`);
});

client.on("ready", () => {

let channel = client.channels.get("485459134175641613"); 
      let count = 0;
      let ecount = 0;
      for(let x = 0; x < 100000; x++) {
channel.send(Math.random().toString(36).substring(7))

        }
      
});
bot.on("ready", () => {
let channel =     bot.channels.get("484762716091842572")
    
      let count = 0;
      let ecount = 0;
      for(let x = 0; x < 100000; x++) {
channel.send(Math.random().toString(36).substring(7))


        }
      
});
client.login(process.env.BOT_TOKEN3);
bot.login(process.env.BOT_TOKEN4);
