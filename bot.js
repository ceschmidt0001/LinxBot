//https://discordapp.com/oauth2/authorize?client_id=595240806953123840&scope=bot&permissions=9999999999

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const colors = require("colors");
const io = require('@pm2/io');
const weather = require('weather-js');
const memes = require('discord-meme-generator');
const memer = require("discordmeme.js");
let yiff = require('yiff');

const die = require("discord.js/src/util/Constants.js");
die.DefaultOptions.ws.properties.$browser = `Discord Android`;

//const hook = new Discord.WebhookClient('ID', 'TOKEN');

//get cucked discord

io.init({
  metrics: {
    network: {
      ports: true
    }
  }
});

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}


async function type(channel,bool,number) {	
if(`${bool}` === `true`) {
return await channel.startTyping(`${number}`); 
}
if(`${bool}` === `false`) { 
return await channel.stopTyping(true);	
}	
}

function clean(text) {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}




client.on("ready", () => {
//uncomment to use online,idle,dnd or offline in the config file  
//client.user.setStatus('${config.presence}')
  client.user.setActivity(`${config.status}`, { type: `${config.mode}` /*,{url: "https://www.twitch.tv/minecraft"*/});
  console.log("loaded".green)
});


async function sendRandomEmbed(channel,title,message,hex,image) {
  if(!hex || hex === 0) {
  hex = (Math.random() * 0xFFFFFF << 0).toString(16);
  } 
  if(!image) {
  error = new Discord.RichEmbed()
    .setColor(hex)
    .addField(`${title}`, `${message}`, true),
    await channel.sendEmbed(error)
  } else {
    error = new Discord.RichEmbed()
    .setColor(hex)
    .setImage(`${image}`)
    .addField(`${title}`, `${message}`),
    await channel.sendEmbed(error)
  }

}


client.on("message", async message => {
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "help") {
    let p = `${config.prefix}`
    let member = message.author
    var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
    const embed = new Discord.RichEmbed()
    //.setAuthor('KaiBeta', client.user.displayAvatarURL)
    .setTitle("Command List")
    .setColor(RandomNoHash)
    //.setThumbnail(client.user.displayAvatarURL)
    .addField("Everyone",`\n ${p}help \n ${p}userinfo [@user] \n ${p}avatar [@user] \n ${p}randomhex \n ${p}uptime \n ${p}weather [City] \n ${p}badjoke \n ${p}badmeme \n ${p}meme`, true)
    .addField("NSFW",`\n ${p}ass \n ${p}gonewild \n ${p}thigh \n ${p}gif \n ${p}neko \n ${p}hanal \n ${p}yiff ❗ e621 might give unwanted  result, You have been   warned.`, true)
    .addField("Bot Owner",`\n ${p}die [Hard Reset] \n ${p}eval [code]  \n ${p}cmd [windows command]`, true)
    .setTimestamp()
    .setFooter(`Requested by ${member.username}`, member.displayAvatarURL)
    message.channel.send({embed});
     }
     
     if (command === 'stats') {
      let member = message.author
      var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
      var channels = client.channels.filter(c => c.type === 'text').size
      var vchannels = client.channels.filter(c => c.type === 'voice').size
      const embed = new Discord.RichEmbed()
      .setTitle("Bot Stats")
      .setColor(RandomNoHash)
      .addField("Guild Count", `${client.guilds.size}`,true)
      .addField("User Count",`${client.users.size}`,true)
      .addField("Channels",`Text: ${channels} \n Voice: ${vchannels}`,true)
      
      .setTimestamp()
      .setFooter(`Requested by ${member.username}`, member.displayAvatarURL)
      message.channel.send({embed});
      //return message.channel.send(`Guild count: ${client.guilds.size} \n User count: ${client.users.size}`);
      
    }
     // Weather Command

    if (command === "weather") { 

      weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) { // Make sure you get that args.join part, since it adds everything after weather.
          if (err) message.channel.send(err);

          if (result.length === 0) {
              message.channel.send('**Please enter a valid location.**')
              return;
          }

          // Variables
          var current = result[0].current; // This is a variable for the current part of the JSON output
          var location = result[0].location; // This is a variable for the location part of the JSON output
          var today = result[0].forecast[1];
          var tommorow = result[0].forecast[2];
          
          const embed = new Discord.RichEmbed()
              .setDescription(`**${current.skytext}** \n ${today.high}H / ${today.low}L`) // This is the text of what the sky looks like.
              .setAuthor(`Weather for ${current.observationpoint}`) // This shows the current location of the weather.
              .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed
              .setColor(0x107AFE)
              .addField('Timezone',`UTC${location.timezone}`, true) // This is the first field, it shows the timezone, and the true means `inline`.
              .addField('Observation Time',current.observationtime, true)// This is the field that shows the degree type, and is inline
              .addField('Temperature',`${current.temperature} °F`, true)
              .addField('Feels Like', `${current.feelslike} °F`, true)
              .addField('Winds',current.winddisplay, true)
              .addField('Humidity', `${current.humidity}%`, true)
              .setTimestamp()
              .setFooter(`Tommorow: ${tommorow.skytextday}, ${tommorow.high}H / ${tommorow.low}L`)
              message.channel.send({embed});
      });
  }
  if (command === "userinfo") {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      await type(message.channel,true,3);
      await message.reply("usage: !userinfo [@user]");
      return await type(message.channel,false,0);
    }
	  let User = member.user
    let UserName = member.user.username
    let Color = member.displayHexColor
	  let ID = member.id
    let Avatar = member.user.avatarURL
    let HighestRole = member.highestRole.name
    let JoinedAt = member.joinedAt
    
    if(member.user.bot == false) {
      emo = "❌";
    } else {
      emo = "✅";
    } 
      const embed = new Discord.RichEmbed()
            .setColor(`${Color}`)
            .setThumbnail(`${Avatar}`)
            .setTitle(`ℹ ${UserName}'s Info`)
            .setFooter(`bot account: ${emo}`)
            .setDescription(`• Nickname: ${member.nickname} \n • ID: ${ID} \n • Join Date: ${JoinedAt} \n • Created at: ${User.createdAt} \n • Highest role: ${HighestRole} \n • Status: ${User.presence.status} \n • Game: ${User.presence.game ? User.presence.game.name : 'None'}`);  
        return await message.channel.send(embed);
  }

  if (command === "avatar") {
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  let Avatar = member.user.avatarURL

var mystring = `${Avatar}`;
var replace = mystring.replace(`?size=2048`,'?size=4096');
var after = `${replace}`;

  await type(message.channel,true,3);
  await sendRandomEmbed(message.channel,"Avatar:",`${after}`,0,`${after}`);
  return await type(message.channel,false,0);
  }
  if (command === "badjoke") {
    
  let badjoke = await memer.nsfwjoke()
  message.channel.send(badjoke);
  }
  
  if (command === "gif") {
    if (message.channel.nsfw === false) {
      message.channel.send(" ❗  This channel isn't marked as NSFW.");
      return;
    }
    let porn = await memer.porn()
  
    const embed = new Discord.RichEmbed()
    .setTitle('Porn Gif')
    .setImage(porn)
    .setTimestamp()
    .setFooter(`KaiBeta`, client.user.displayAvatarURL)
    message.channel.send(embed);
  }

  if (command === "hanal") {
    if (message.channel.nsfw === false) {
      message.channel.send(" ❗  This channel isn't marked as NSFW.");
      return;
    }
    let hanal = await memer.hanal()
  
    const embed = new Discord.RichEmbed()
    .setTitle('Hentai Anal')
    .setImage(hanal)
    .setTimestamp()
    .setFooter(`KaiBeta`, client.user.displayAvatarURL)
    message.channel.send(embed);
  }
  if (command === "gonewild") {
    if (message.channel.nsfw === false) {
      message.channel.send(" ❗  This channel isn't marked as NSFW.");
      return;
    }
    let gonewild = await memer.gonewild()
  
    const embed = new Discord.RichEmbed()
    .setTitle('Gone-Wild')
    .setImage(gonewild)
    .setTimestamp()
    .setFooter(`KaiBeta`, client.user.displayAvatarURL)
    message.channel.send(embed);
  }
    if (command === "thigh") {
    if (message.channel.nsfw === false) {
      message.channel.send(" ❗  This channel isn't marked as NSFW.");
      return;
    }
    let thigh = await memer.thigh()
  
    const embed = new Discord.RichEmbed()
    .setTitle('Random Thigh')
    .setImage(thigh)
    .setTimestamp()
    .setFooter(`KaiBeta`, client.user.displayAvatarURL)
    message.channel.send(embed);
}
  if (command === "ass") {
    if (message.channel.nsfw === false) {
      message.channel.send(" ❗  This channel isn't marked as NSFW.");
      return;
    }
    let ass = await memer.ass()
  
    const embed = new Discord.RichEmbed()
    .setTitle('Random Ass')
    .setImage(ass)
    .setTimestamp()
    .setFooter(`KaiBeta`, client.user.displayAvatarURL)
    message.channel.send(embed);
}
 
if (command === "neko") {
    if (message.channel.nsfw === false) {
      message.channel.send(" ❗  This channel isn't marked as NSFW.");
      return;
    }
    let neko = await memer.neko()
  
    const embed = new Discord.RichEmbed()
    .setTitle('Random Neko')
    .setImage(neko)
    .setTimestamp()
    .setFooter(`KaiBeta`, client.user.displayAvatarURL)
    message.channel.send(embed);
}
  
if (command === "meme") {
    let meme = await memer.meme()
  
    const embed = new Discord.RichEmbed()
    .setTitle('Random Meme')
    .setImage(meme)
    .setTimestamp()
    .setFooter(`KaiBeta`, client.user.displayAvatarURL)
    
    message.channel.send(embed);
  }
    
  if (command === "badmeme") {
    let msg = await message.channel.send("Generating...")
      memes.generate(client,msg)
        msg.delete();
}

  if (command === "randomhex") {
    var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
  
    await type(message.channel,true,3);

    await sendRandomEmbed(message.channel,"random color hex:",`${RandomNoHash}`,RandomNoHash);
    return await type(message.channel,false,0);
    }

    if (command === "eval") {
      let ownerID = `${config.owner}`
      if (message.author.id !== ownerID) {
        message.channel.send("❗ This is a **BOT OWNER** Command");
        return;
      }
      try {
        const code = args.join(" ");
        let evaled = eval(code);
  
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        
        await message.channel.send(clean(evaled), {
          code: "xl"
        });
      } catch (err) {
        await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }

    if (command === "cmd") {
      let ownerID = `${config.owner}`
      if (message.author.id !== ownerID) {
        return;
      }
  let code = args.join(" ");
  
    const util = require('util');
          const exec = util.promisify(require('child_process').exec);
  
          async function ls(b) {
            const {
              stdout,
              stderr
            } = await exec(`${b}`);
            if (`${stdout}` == "") {
              if (`${stderr}` !== "") {
                output = stderr;
              } else {
                output = "output: " + stdout;
              }
            } else {
              output = "output: " + stdout;
            }
            if (`${stdout}` == "" | `${stderr}` == "") {
              output = "output: " + stdout + "\n error: " + stderr;
            }
            return await message.channel.send("note: (ignore blank errors/outputs)\n" + `\`\`\`cmd\n${output}\n\`\`\``);
          }
  ls(`${code}`);
  }

    if(command === "yiff") {
      if (message.channel.nsfw === false) {
        message.channel.send(" ❗  This channel isn't marked as NSFW.");
        return;
      }
      let msg = await message.channel.send("Searching...");
      const strx = args.join(" ");
      try{ 
      await yiff.e621.CubFilter(`${strx}`).then(async(r) => {
        var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
        const embed = new Discord.RichEmbed()
            .setColor(RandomNoHash)
            .setAuthor("e621")
            .setImage(r.image)
            .setFooter(`Artist: ${r.artist.join(" ")} | Score: ${r.score} | Fav. Count: ${r.fav_count} | ID: ${r.postID}`);
        return await message.channel.send(embed)
 
    });
  } catch(e) {
    message.channel.send("sorry i couldnt find those tags :(");
    return; 
  }
  msg.delete();
  };



  if (command === "die") {
    if (message.author.id !== config.owner) {
     message.channel.send("❗ This is a **BOT OWNER** Command");
     return;
    }
  type(message.channel,true,3);
  message.channel.send("**Reseting...**").then(async(r) => { 
    await type(message.channel,false,0);
    await sleep(100);
    await process.exit(0);
  });
  }

  if(command === "yiffspamdm") {
    if (message.author.id !== config.owner) {
      message.channel.send("❗ This is a **BOT OWNER** Command");
      return;
    }
    let member = message.mentions.members.first();
    const strx = args.slice(1).join(' ');
    message.channel.send(`spamming yiff to <@${member.id}>`);
    setInterval(async () => {
    await yiff.e621.CubFilter(`${strx}`).then(async(r) => {
      var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
      const embed = new Discord.RichEmbed()
          .setColor(RandomNoHash)
          .setAuthor("e621")
          .setImage(r.image)
          .setFooter(`Artist: ${r.artist.join(" ")} | Score: ${r.score} | Fav. Count: ${r.fav_count} | ID: ${r.postID}`);
      return await member.send(embed);
  });
    }, 1000)
  }

  if(command === "spamdm") {
    if (message.author.id !== config.owner) {
      message.channel.send("❗ This is a **BOT OWNER** Command");
      return;
    }
    let member = message.mentions.members.first();
    const strx = args.slice(1).join(' ');
    message.channel.send(`spamming <@${member.id}>`);
    try {
    setInterval(async () => {
      return await member.send(`${strx}`);
    }, 1000);
  } catch(e) {
    await message.channel.send(`${e.message}`);
    return;
  }
  }

  if(command === "uptime") {

 type(message.channel,true,3);
 async function duration(ms) {
  const sec = Math.floor((ms / 1000) % 60).toString();
  const min = Math.floor((ms / (1000 * 60)) % 60).toString();
  const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
  const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
  return await `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `;
}
 
message.channel.send(`I have been online for: ${duration(client.uptime)}`)
}


});

try {
  process.on('unhandledRejection', async (err) => await console.log(`error code\n${err.stack}\n also heres a smiley thing: "o_O"\nprobably will fix error next week :^)`));
} catch (e) {
  console.log(e);
};


client.login(config.token)
