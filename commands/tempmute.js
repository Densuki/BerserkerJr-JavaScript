const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //   //%tempmute @user 1s/m/h/d

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Você não pode fazer isso!.");
    if (args[0] == "help"){
      message.reply("use: %mute <user> <time> <s|m|h|d>\n\n exemplo: `%mute @zayron 5m Por ser um humano perfeito!`");
      return;
    }

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Não foi possível encontrar o usuário.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Não consigo mutar!");
    let reason = args.slice(2).join(" ");
    if (!reason) return message.reply("😅 por favor forneça o Motivo!")
    console.log(reason)


    let muterole = message.guild.roles.find(`name`, "muted");
    //O começo para criar o Cargo de Mute
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "🔇🔈🔇Master Muted🔇🔈🔇",
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    //O fim para criar o Cargo de Mute
    let mutetime = args[1];
    if(!mutetime) return message.reply("**Você não especificou um Tempo!**");

    message.delete().catch(O_o=>{});

    try{
      await tomute.send(`Você foi mutado por ${mutetime}.`)
    }catch(e){
      message.channel.send(`Você foi mutado e a mensagem foi enviada para o seu privado. O tempo do mute corresponde a ${mutetime}`)
    }

    let muteEmbed = new Discord.RichEmbed()
    .setDescription(`Mute feito por ${message.author}`)
    .setColor("#5F04B4") //ROXO
    .addField("Usuário Mutado", tomute)
    .addField("Mutado em", message.channel)
    .addField("Horário", message.createdAt)
    .addField("Duração", mutetime)
    .addField("Motivos", reason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    //Nome do canal (acho que ele cria o canal 🤔)
    if(!reportschannel) return message.channel.send("não foi possível encontrar o canal de relatórios|Reports.");
    reportschannel.send(muteEmbed);

    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}>**foi silenciado por** ${ms(ms(mutetime))}`).then(msg => msg.delete(5000));

    setTimeout(function(){
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}>**foi desmutado!**`).then(msg => msg.delete(5000));
    }, ms(mutetime));


  //Fim do Modulo
}

module.exports.help = {
  name:"mute"
}
