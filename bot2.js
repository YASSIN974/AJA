const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const request = require("request");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const YouTube = require('simple-youtube-api');
const config = require('./settings.json');

const yt_api_key = "AIzaSyAZdeSFAngg9CkYUGmRIFf4N6qcvHouJ8w";
const bot_controller = '484757484184272897';
const prefix = "y";

const youtube = new YouTube(yt_api_key);
var queue = [];
var isPlaying = false;
var dispatcher = null;
var VoiceChannel = null;
var skipReq = 0;
var skippers = [];

var guilds = {};

client.login(discord_token);

client.on('message', function (message) {  
    const member = message.member;
    const mess = message.content.toLowerCase();
    const args = message.content.split(' ').slice(1).join(" ");
    if (mess.startsWith(prefix + "play")) {
        if (member.voiceChannel != null) {
            if (queue.length > 0 || isPlaying) {
                getID(args, function (id) {
                    add_to_queue(id);
                    fetchVideoInfo(id, function (err, videoInfo) {
                        if (err) throw new Error(err);
                        message.reply("Added To Queue **" + videoInfo.title + "!**");
                    });
                });
            } else {
                isPlaying = true;
                getID(args, function (id) {
                    queue.push("placeholder");
                    PlayMusic(id, message);
                    fetchVideoInfo(id, function (err, videoInfo) {
                        if (err) throw new Error(err);
                        message.reply("Now Playing **" + videoInfo.title + "!**");
                    });
                });
            }
        } else {
            message.reply("I must be in a voice channel first!");
        }
    } else if (mess.startsWith(prefix + "skip")) {
        skip_song(message);
        message.reply("Skipped Song!");
    } else if (mess.startsWith(prefix + "leave")) {
       // voiceChannel.leave();
    }
});

client.on('ready', function () {
    client.user.setActivity("Music Probably.");
    console.log("I am working (kinda).");
});

function skip_song(message) {
    dispatcher.end();
    if (queue.lenth > 1) {
        PlayMusic(queue[0].message);
    } else {
        skipReq = 0;
        skippers = [];
    }
}

function PlayMusic(id, message) {
  let  voiceChannel = message.member.voiceChannel;

    voiceChannel.join().then(function (connection) {
      let  stream = ytdl("https://www.youtube.com/watch?v=" + id, {
            filter: 'audioonly'
        });
        skipReq = 0;
        skippers = [];

        dispatcher = connection.playStream(stream);
        dispatcher.on('end', function () {
            skipReq = 0;
            skippers = [];
            queue.shift();
            if (queue.length === 0) {
                queue = [];
                isPlaying = false;
            } else {
                PlayMusic(queue[0], message);
            }
        });
    });
}

function getID(str, callback) {
    if (isYouTube(str)) {
        callback(getYouTubeID(str));
    } else {
        search_video(str, function (id) {
            callback(id);
        });
    }
}

function add_to_queue(strID,str) {
    if (isYouTube(strID)) {
        queue.push(getYouTubeID(str));
    } else {
        queue.push(strID);
    }
}

function search_video(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function (error, response, body) {
        var json = JSON.parse(body);
        callback(json.items[0].id.videoId);
    });
}

function isYouTube(str) {
    return str.toLowerCase().indexOf("youtube.com") > -1;
}
client.login(process.env.BOT_TOKEN));
