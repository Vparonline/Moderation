const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const ayar = require("../settings.json");
const kdb = new qdb.table("teyitler");

module.exports.execute = async (client, message, args) => {
		

  if(!message.member.roles.cache.has(ayar.YetkiliRolleri.RegisterHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.Emojiler.no);  
  let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
  let data = await kdb.get("reg") || {};
  let arr = Object.keys(data);
  let listedMembers = arr.filter(dat => message.guild.members.cache.has(dat)).sort((a,b) => Number((data[b].erkek || 0) + (data[b].kadin || 0)) - Number((data[a].erkek || 0) + (data[a].kadin || 0))).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value)} adlı üyenin toplam **${((data[value].erkek || 0) + (data[value].kadin || 0))}**  (**${data[value].erkek || 0}** erkek, **${data[value].kadin || 0}** kadın)`).splice(0, 30);
  message.react(ayar.Emojiler.yes)
  message.channel.send(embed.setDescription(`**Top Teyit Listesi**\n\n${listedMembers.join("\n") || "Teyit verisi bulunamadı!"}`)).catch();
};
module.exports.configuration = {
    name: "topteyit",
    aliases: [],
    usage: "topteyit",
    description: ""
};
