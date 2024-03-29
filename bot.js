/* Version 0.30.0
  __/\\\________________________________________________/\\\\\\\\\\\\\_______________________________        
   _\/\\\_______________________________________________\/\\\/////////\\\_____________________________       
    _\/\\\______________/\\\_____________________________\/\\\_______\/\\\___________________/\\\______      
     _\/\\\_____________\///___/\\/\\\\\\____/\\\____/\\\_\/\\\\\\\\\\\\\\______/\\\\\_____/\\\\\\\\\\\_     
      _\/\\\______________/\\\_\/\\\////\\\__\///\\\/\\\/__\/\\\/////////\\\___/\\\///\\\__\////\\\////__    
       _\/\\\_____________\/\\\_\/\\\__\//\\\___\///\\\/____\/\\\_______\/\\\__/\\\__\//\\\____\/\\\______   
        _\/\\\_____________\/\\\_\/\\\___\/\\\____/\\\/\\\___\/\\\_______\/\\\_\//\\\__/\\\_____\/\\\_/\\__  
         _\/\\\\\\\\\\\\\\\_\/\\\_\/\\\___\/\\\__/\\\/\///\\\_\/\\\\\\\\\\\\\/___\///\\\\\/______\//\\\\\___ 
          _\///////////////__\///__\///____\///__\///____\///__\/////////////_______\/////_________\/////____*/

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const colors = require("colors");
const io = require('@pm2/io');
const weather = require('weather-js');
const memer = require("discordmeme.js");
const math = require('mathjs');

const die = require("discord.js/src/util/Constants.js");
die.DefaultOptions.ws.properties.$browser = `Discord Android`;

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

var http = require('https');
var fs = require('fs');
var os = require('os');
var ms = require("ms");

async function type(channel, bool, number) {
  if (`${bool}` === `true`) {
    return await channel.startTyping(`${number}`);
  }
  if (`${bool}` === `false`) {
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
  //client.user.setStatus('${config.presence}')
  client.user.setActivity(`${config.status}`, { type: `${config.mode}` /*,{url: "https://www.twitch.tv/minecraft"*/ });
  console.log("Bot Loaded Successfuly".green)
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined! (${guild.name})`);
  client.user.setActivity(`${config.status}`, { type: `${config.mode}` /*,{url: "https://www.twitch.tv/minecraft"*/ });
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

function UpdateFile(FileName, Link) {
  let a = FileName;
  let b = Link;
  fs.unlink(`./${a}`, function (err) {
    if (err && err.code == 'ENOENT') {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error("Error occurred while trying to remove file");
    } else {
      //continue
    }
  });
  const request = require("request")
  var file = fs.createWriteStream(`./${a}`);
  var r = request(`${b}`).pipe(file);
  r.on('error', function (err) {
    console.log(err);
  });
  r.on('finish', function () {
    file.close(sleep(1));
  });
}

async function sendRandomEmbed(channel, title, message, hex, image, thumbnail) {
  if (!hex || hex === 0) {
    hex = (Math.random() * 0xFFFFFF << 0).toString(16);
  }
  if (!image && !thumbnail) {
    embed = new Discord.RichEmbed()
      .setColor(hex)
      .addField(`${title}`, `${message}`),
      await channel.sendEmbed(embed)
  }
  if (!image && thumbnail) {
    embed = new Discord.RichEmbed()
      .setColor(hex)
      .setThumbnail(`${thumbnail}`)
      .addField(`${title}`, `${message}`),
      await channel.sendEmbed(embed)
  }
  if (image) {
    embed = new Discord.RichEmbed()
      .setColor(hex)
      .setImage(`${image}`)
      .addField(`${title}`, `${message}`),
      await channel.sendEmbed(embed)
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
      .setTitle("Command List")
      .setColor(RandomNoHash)
      .addField("Click", "[This](https://ceschmidt0001.github.io/LinxBot/)")
      .setTimestamp()
      .setFooter(`Requested by ${member.username}`, member.displayAvatarURL)
    message.channel.send({ embed });

  }



  if (command === 'stats') {
    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const cpu = require('os').cpus().map(i => i.model);
    const cpuLength = cpu.length;
    const cpuType = cpu[0];
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 3600;
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.round(totalSeconds % 60);
    let member = message.author
    var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
    var channels = client.channels.filter(c => c.type === 'text').size
    var vchannels = client.channels.filter(c => c.type === 'voice').size
    const embed = new Discord.RichEmbed()
      .setTitle("📊 Bot Stats - Invite")
      .setURL(`https://discord.com/oauth2/authorize?client_id=710215820307071037&permissions=8&scope=bot`)
      .setColor(RandomNoHash)
      .addField("Guild Count", `${client.guilds.size}`, true)
      .addField("User Count", `${client.users.size}`, true)
      .addField("Channels", `Text: ${channels} \n Voice: ${vchannels}`, true)
      .addField("Processor", `${cpuLength}x ${cpuType}`, true)
      .addField("Memory usage", `${memoryUsage}MB`, true)
      .addField("Uptime", `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`, true)
      .setTimestamp()
      .setFooter(`Requested by ${member.username}`, member.displayAvatarURL)
    message.channel.send({ embed });
    //return message.channel.send(`Guild count: ${client.guilds.size} \n User count: ${client.users.size}`);

  }

  if (command === "hook") {
    try { await message.delete(); } catch (e) { console.log(`${e.message}`); }
    try {
      const strx = args.join(" ");
      const hook = new Discord.WebhookClient(`699344838138658881`, `2QxrnmwUm8-Yy6oOHApD2pbdxJ-ZTscdZ8P1a_RjzDzsATAWCCep8bBtY5AFdP_UQIbi`);
      await hook.send(`${strx}`);
    } catch (e) {
      console.log(`${e.message}`);
      return;
    }
    return;
  }

  if (command === "setn") {

    if (!message.guild.me.hasPermission(["ADMINISTRATOR"])) return message.channel.send("I don't have permission to do this!")


    if (message.author.id !== config.owner) {
      if (!message.member.hasPermission(["ADMINISTRATOR"])) {
        await type(message.channel, true, 3);
        var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
        error = new Discord.RichEmbed()
          .setColor(RandomNoHash)
          .addField("Error", "Sorry, you don't have permissions to use this!"),
          await message.channel.sendEmbed(error)
        await type(message.channel, false, 0)
        return;
      }
    }

    let strx = args.join(" ");

    if (!args[0]) {
      message.channel.send(`\`Please specify a new guild name!\``);
      return;
    }
    message.guild.setName(strx)
      .then(g => message.channel.send(`Updated guild name to \`${g}\``))
      .catch(console.error);
  }

  if (command === "setv") {

    if (!message.guild.me.hasPermission(["ADMINISTRATOR"])) return message.channel.send("I don't have permission to do this!")


    if (message.author.id !== config.owner) {
      if (!message.member.hasPermission(["ADMINISTRATOR"])) {
        await type(message.channel, true, 3);
        var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
        error = new Discord.RichEmbed()
          .setColor(RandomNoHash)
          .addField("Error", "Sorry, you don't have permissions to use this!"),
          await message.channel.sendEmbed(error)
        await type(message.channel, false, 0)
        return;
      }
    }

    let strx = args.join(" ");

    if (!args[0]) {
      message.channel.send(`Please specify guild verification level: 0,1,2,3 or 4 \n Current level: \`${message.guild.verificationLevel}\``);
      return;
    }
    message.guild.setVerificationLevel(strx)
      .then(g => message.channel.send(`Updated guild verification level to \`${g.verificationLevel}\``))
      .catch(console.error);
  }
  // Weather Command

  if (command === "weather") {

    weather.find({ search: args.join(" "), degreeType: 'F' }, function (err, result) {
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
        .addField('Timezone', `UTC${location.timezone}`, true) // This is the first field, it shows the timezone, and the true means `inline`.
        .addField('Observation Time', current.observationtime, true)// This is the field that shows the degree type, and is inline
        .addField('Temperature', `${current.temperature} °F`, true)
        .addField('Feels Like', `${current.feelslike} °F`, true)
        .addField('Winds', current.winddisplay, true)
        .addField('Humidity', `${current.humidity}%`, true)
        .setTimestamp()
        .setFooter(`Tommorow: ${tommorow.skytextday}, ${tommorow.high}H / ${tommorow.low}L`)
      message.channel.send({ embed });
    });
  }

  if (command === "forecast") {

    weather.find({ search: args.join(" "), degreeType: 'F' }, function (err, result) {
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
      var third = result[0].forecast[3];
      var forth = result[0].forecast[4];
     
      if (location.alert.length === 0) {
       warning = `No Alerts for ${location.name}`
      } else {
        warning = `${location.alert}`
      }

      const embed = new Discord.RichEmbed()
        .setDescription(`**${today.day}** \n ${current.skytext} \n ${today.high}H / ${today.low}L`) // This is the text of what the sky looks like.
        .setAuthor(`Forecast for ${location.name}`) // This shows the current location of the weather.
        .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed
        .setColor(0x107AFE)
        .addField(`${tommorow.day}`, `${tommorow.skytextday} \n High ${tommorow.high}°F / Low ${tommorow.low}°F \n 🌧${tommorow.precip}%`, true) // This is the first field, it shows the timezone, and the true means `inline`.
        .addField(`${third.day}`, `${third.skytextday} \n High ${third.high}°F / Low ${third.low}°F \n 🌧${third.precip}%`, true)// This is the field that shows the degree type, and is inline
        .addField(`${forth.day}`, `${forth.skytextday} \n High ${forth.high}°F / Low ${forth.low}°F \n 🌧${forth.precip}%`, true)
        .addField(`Weather Alerts`, `${warning} \n `, true)
        //.addField(`${fifth.day}`, `${fifth.skytextday} \n High ${fifth.high}°F / Low ${fifth.low}°F \n 🌧${fifth.precip}%`, true)
        //.addField(`${sixth.day}`, `${sixth.skytextday} \n High ${sixth.high}°F / Low ${sixth.low}°F \n 🌧${sixth.precip}%`, true)
        //.addField(`${seventh.day}`, `${seventh.skytextday} \n High ${seventh.high}°F / Low ${seventh.low}°F \n 🌧${seventh.precip}%`, true)
        .setTimestamp()
        .setFooter(`Weather Provided by Microsoft`)
      message.channel.send({ embed });
    });
  }

  if (command === "userinfo") {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      await type(message.channel, true, 3);
      await message.reply("usage: !userinfo [@user]");
      return await type(message.channel, false, 0);
    }
    let User = member.user
    let UserName = member.user.username
    let Color = member.displayHexColor
    let ID = member.id
    let Avatar = member.user.avatarURL
    let HighestRole = member.highestRole.name
    let JoinedAt = member.joinedAt

    if (member.user.bot == false) {
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
    //await type(message.channel,true,3); 
    //await sendRandomEmbed(message.channel,"User's Info:",`name: ${User} \n id: ${ID} \n Join Date: ${JoinedAt} \n Highest role: ${HighestRole}`);
    //return await type(message.channel,false,0);
  }

  if (command === "ban") {

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this!")

    if (message.author.id !== config.owner) {
      if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) {
        await type(message.channel, true, 3);
        var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
        error = new Discord.RichEmbed()
          .setColor(RandomNoHash)
          .addField("Error", "Sorry, you don't have permissions to use this!"),
          await message.channel.sendEmbed(error)
        await type(message.channel, false, 0)
        return;
      }
    }



    let member = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!member) return message.channel.send("Please provide a user to Ban!")

    if (`${message.author.id}` === `${member.id}`) {
      await type(message.channel, true, 3);
      await message.channel.send("I'm not sure why you would ban yourself");
      return await type(message.channel, false, 0);
    }

    if (`${member.id}` === `${config.owner}`) {
      await type(message.channel, true, 3);
      await message.channel.send("you can't ban the bot owner.");
      return await type(message.channel, false, 0);
    }


    if (!member.bannable) {
      await type(message.channel, true, 3);
      await message.channel.send("guild member is too powerful!");
      return await type(message.channel, false, 0);
    }

    let reason = args.slice(1).join(' ');
    if (!reason) {
      reason = "No reason provided";
    }

    await member.ban(reason)
      .catch(async (error) => {
        await type(message.channel, true, 3);
        message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`)
        await type(message.channel, false, 0);
      });

    await sendRandomEmbed(message.channel, `Ban Event`, `${member} has been banned by ${message.author} \n reason: ${reason}`, 0xFF0000)
    return;
  }

  if (command === "kick") {


    if (message.author.id !== config.owner)
      if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")


    if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this!")

    let kickMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!kickMember) return message.channel.send("Please provide a user to Kick!")

    if (`${message.author.id}` === `${kickMember.id}`) {
      await type(message.channel, true, 3);
      await message.channel.send("i'm not sure why you would kick yourself");
      return await type(message.channel, false, 0);
    }

    if (`${kickMember.id}` === `${config.owner}`) {
      await type(message.channel, true, 3);
      await message.channel.send("you can't kick the bot owner.");
      return await type(message.channel, false, 0);
    }

    if (!kickMember.kickable) {
      await type(message.channel, true, 3);
      await message.channel.send("guild member is too powerful!");
      return await type(message.channel, false, 0);
    }

    let reason = args.slice(1).join(' ');
    if (!reason) {
      reason = "No reason provided";
    }

    await kickMember.kick(reason)
      .catch(error => sendRandomEmbed(message.channel, `Error`, `Sorry ${message.author}, I couldn't kick because of : ${error}`, 0xFF0000))
    await sendRandomEmbed(message.channel, `Kick Event`, `${kickMember} has been kicked by ${message.author} \n reason: ${reason}`, 0xFFD000)
    return;

    /*let embed = new Discord.RichEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "kick")
    .addField("Mutee:", kickMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "tut-modlogs")
        sChannel.send(embed)*/

  }
  if (command === "ping") {
    if (!args[0]) {
      const m = await message.channel.send("pinging...");
      return await m.edit(`⏱Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    } else {
      try {
        let strx = args.join(" ");
        const m = await message.channel.send("ok, pinging...");
        let msg = await require("child_process").execSync(`ping -c 4 ${strx}`).toString();
        await m.edit(`${msg}`, { code: "x1" });
      } catch (err) {
        await message.channel.send(`\`100% packet loss\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
  }

  if (command === "avatar") {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let Avatar = member.user.avatarURL

    var mystring = `${Avatar}`;
    var replace = mystring.replace(`?size=2048`, '?size=4096');
    var after = `${replace}`;

    await type(message.channel, true, 3);
    await sendRandomEmbed(message.channel, "Avatar:", `${after}`, 0, `${after}`);
    return await type(message.channel, false, 0);
  }

  if (command === "8ball") {
    var fortunes = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes - definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful."
    ]

    // const args = args.join(" ");
    if (!args[2]) {
      return message.channel.reply("Ask a **FULL** question!");
    }

    await sendRandomEmbed(message.channel, `🎱 Magic 8ball`, fortunes[Math.floor(Math.random() * fortunes.length)], 0x0000FF)
  }

  if (command === "neko") {
    let neko = await memer.neko()

    const embed = new Discord.RichEmbed()
      .setTitle('Random Neko')
      .setImage(neko)
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL)
    message.channel.send(embed);
  }

  if (command === "addrole") {

    if (message.author.id !== config.owner) {
      if (!message.member.hasPermission(["ADMINISTRATOR"])) {
        await type(message.channel, true, 3);
        var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
        error = new Discord.RichEmbed()
          .setColor(RandomNoHash)
          .addField("Error", "Sorry, you don't have permissions to use this!"),
          await message.channel.sendEmbed(error)
        await type(message.channel, false, 0)
        return;
      }
    }

    if (!args[0]) {
      await type(message.channel, true, 3);
      await message.reply("usage: !addrole [name] [color]");
      return await type(message.channel, false, 0);
    }

    message.guild.createRole({
      name: args[0],
      color: args[1],
      permissions: []
    })
      .then(role => {
        // await type(message.channel,true,3);
        sendRandomEmbed(message.channel, "Role Created", `${role.name}`, role.color || 0x323232);
        //  return await type(message.channel,false,0);
      })
  };


  if (command === "randomhex") {
    var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);

    await type(message.channel, true, 3);

    await sendRandomEmbed(message.channel, "random color hex:", `${RandomNoHash}`, RandomNoHash);
    return await type(message.channel, false, 0);
  }

  if (command === "eval") {
    let ownerID = `${config.owner}`
    if (message.author.id !== ownerID) {
      message.channel.send("❌ This is a **BOT OWNER** Command");
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

  if (command === "die") {
    if (message.author.id !== config.owner) {
      message.channel.send("❌ This is a **BOT OWNER** Command");
      return;
    }
    type(message.channel, true, 3);
    message.channel.send("**Reseting...**").then(async (r) => {
      await type(message.channel, false, 0);
      sleep(100);
      process.exit(0);
    });
  }

  if (command === "source") {
    await type(message.channel, true, 3);
    await message.channel.send("<https://raw.githubusercontent.com/ceschmidt0001/LinxBot/master/bot.js>");
    return await type(message.channel, false, 0);
  }

  if (command === "color") {
    const strx = args.join(" ");
    await type(message.channel, true, 3);

    await sendRandomEmbed(message.channel, "color", `${strx}`, strx);
    return await type(message.channel, false, 0);
  }

  if (command === "cowsay") {
    if (!args[0]) {
      return message.channel.send("!cowsay [optional: -f cowfile] [text] \n say `,cowsay -l` for list of cowfiles.");
    }
    let strx = args.join(" ");
    let msg = require("child_process").execSync(`cowsay ${strx}`).toString();
    message.channel.send(`${msg}`, { code: "md" });
  }

  if (command === "figlet") {
    if (!args[0]) {
      return message.channel.reply("!figlet [optional: -k (letters less smushed)][text to figlet]");
    }
    if (!args[3]) {
      return message.channel.reply("Please use less words! I know you want a whole page of cool text but if I let you spam away discord could yeet me... now you don't want that do you?");
    }
    let strx = args.join(" ");
    let msg = require("child_process").execSync(`figlet ${strx}`).toString();
    message.channel.send(`${msg}`, { code: "css" });
  }

  /*if (command === "banner") {
    if (!args[0]) {
      return message.channel.send("!banner [text]");
    }
    let strx = args.join(" ");
    let msg = require("child_process").execSync(`banner ${strx}`).toString();
    message.channel.send(`${msg}`, { code: "glsl" });
  }*/

  if (command === "date") {
    let strx = args.join(" ");
    let msg = require("child_process").execSync(`date "+Today is: %A, %d" && cal ${strx}`).toString();
    message.channel.send(`${msg}`, { code: "css" });
  }

  if (command === "cmd") {
    if (message.author.id !== config.owner) {
      message.channel.send("❗ This is a **BOT OWNER** Command");
      return;
    }
    try {
      let strx = args.join(" ");
      let msg = require("child_process").execSync(`${strx}`).toString();
      message.channel.send(`${msg}`, { code: "css" });
    } catch (err) {
      await message.channel.send(`\`ERROR\` \`\`\`md\n${clean(err)}\n\`\`\``);
    }
  }

  if (command === "update") {
    if (message.author.id !== config.owner) {
      message.channel.send("❗ This is a **BOT OWNER** Command");
      return;
    }
    try {
      const m = await message.channel.send("**Updating...**");
      UpdateFile("bot.js", "https://raw.githubusercontent.com/ceschmidt0001/LinxBot/master/bot.js");
      //UpdateFile("package-lock.json", "https://raw.githubusercontent.com/ceschmidt0001/LinxBot/master/package-lock.json");
      //UpdateFile("package.json", "https://raw.githubusercontent.com/ceschmidt0001/LinxBot/master/package.json");
      await m.edit(`✅ Update Successful`);
    } catch (err) {
      await message.channel.send("❌Update Failed");
    }
  }

});


try {
  process.on('unhandledRejection', async (err) => await console.log(`error code\n${err.stack}\n also heres a smiley thing: "o_O"\nprobably will fix error next week :^)`));
} catch (e) {
  console.log(e);
};


client.login(config.token)
