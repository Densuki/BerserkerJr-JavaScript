const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

      let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
      .setDescription("**Informações do BOT**")
      .setColor("#5F04B4") //ROXO
      .setThumbnail(bicon)
      .addField("**Nome do BOT**", bot.user.username)
      .addField("**Criado em**", bot.user.createdAt)
      .addField("**INVITE**, https://discordapp.com/oauth2/authorize?client_id=455472236694863882&permissions=8&scope=bot")
      .addField("**CRIADOR**, Criado por Por @Yukki Mizuminno 〘Densuki〙#6235 | <@336311215099740160>");

      return message.channel.send(botembed).then(msg => {msg.delete(9000)});
}

module.exports.help = {
  name:"botinfo"
}
