const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
	
	
    let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    if (!message.member.roles.cache.has(ayar.YetkiliRolleri.BanHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.Emojiler.no); 
   if (!args[0] || isNaN(args[0])) return message.channel.send(embed.setDescription("Geçerli bir kullanıcı IDsi girmelisin.")).then(x => x.delete({timeout: 5000}));
  let kullanici = await client.users.fetch(args[0]);
  if (kullanici) {
    message.guild.members.unban(kullanici.id).catch(err => message.channel.send(embed.setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).then(x => x.delete({timeout: 5000})));
    message.channel.send(embed.setDescription(`Belirtilen üyenin yasaklaması başarılı bir şekilde kaldırıldı!`));
    let bans = cdb.get("bans") || [];
    if (bans.some(yasak => yasak.id === kullanici.id)) cdb.set("bans", bans.filter(x => x.id !== kullanici.id));
    message.react(ayar.Emojiler.yes)    
    if(ayar.LogKanallari.BanLogID && client.channels.cache.has(ayar.LogKanallari.BanLogID)) client.channels.cache.get(ayar.LogKanallari.BanLogID).send(embed.setDescription(`${kullanici} (\`${kullanici.id}\`) adlı üyenin banı ${message.author} tarafından kaldırıldı.`));
  } else {
    message.channel.send(embed.setDescription("Geçerli bir kullanıcı IDsi girmelisin.")).then(x => x.delete({timeout: 5000}));
  };
};
module.exports.configuration = {
  name: "unban",
  aliases: [],
  usage: "unban [id] [isterseniz sebep]",
  description: "Belirtilen kişinin banını kaldırır."
};