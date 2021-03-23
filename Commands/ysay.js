const { MessageEmbed } = require('discord.js');
const moment = require("moment")
const qdb = require("quick.db")
const ayar = require("../settings.json")


exports.execute = async (client, message, args) => {
  if(!message.guild) return;

  let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    if(!message.member.hasPermission("ADMINISTRATOR"))  return message.react(ayar.Emojiler.no); 

  let enAltYetkiliRolu = message.guild.roles.cache.get(ayar.YetkiliRolleri.RegisterHammer);
  let yetkililer = message.guild.members.cache.filter(member => member.roles.highest.position >= enAltYetkiliRolu.position);
  let yetkililer2 = yetkililer.filter(member => !member.user.bot)

  message.channel.send(embed.setDescription(`
  Toplam Yetkili Sayısı: ${yetkililer2.size}
  Aktif Yetkili Sayısı: ${yetkililer2.filter(uye => uye.presence.status !== "offline").size}
  Ses Kanalında Olan Yetkili Sayısı: ${yetkililer2.filter(member => member.voice.channel).size}
  Ses Kanalında Olmayan Yetkili Sayısı: ${yetkililer2.filter(member => !member.voice.channel).size}
  `)).catch(e => { });
  message.react(ayar.Emojiler.yes)
};


module.exports.configuration = {
    name: "ysay",
    aliases: ["yetkilisay"],
    usage: "yetkilisay",
    description: ""
};
  