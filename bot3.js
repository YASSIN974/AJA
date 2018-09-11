const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
client.on("ready", () => {
console.log('hello again bitch');
 console.log(`Logged in as ${client.user.tag}!`);
});

client.on("ready", () => {

let channel = client.channels.get("489074364512337925"); 
       setInterval(() => {
channel.send(Math.random().toString(36).substring(1))

     
      
},10);
});
bot.on("ready", () => {
let channel =     bot.channels.get("489069924736565268")
     setInterval(() => {
    channel.send(Math.random().toString(30).substring(1))

});
});

client.login(process.env.BOT_TOKEN3);
bot.login(process.env.BOT_TOKEN4);
