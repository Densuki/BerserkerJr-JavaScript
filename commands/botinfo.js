const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

      let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
      .setDescription("**Informações do BOT**")
      .setColor("#5F04B4") //ROXO
      .setThumbnail(bicon)
      .addField("**Nome do BOT**", bot.user.username)
      .addField("**Criado em**", bot.user.createdAt Por <@336311215099740160>)
       .addField("**INVITE**, https://discordapp.com/oauth2/authorize?client_id=455472236694863882&permissions=8&scope=bot");

      return message.channel.send(botembed).then(msg => {msg.delete(9000)});
}

module.exports.help = {
  name:"botinfo"
}
