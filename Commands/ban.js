const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const pdb = new qdb.table("puanlar");
const limit = new qdb.table("limitler");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {

  let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    if (!message.member.roles.cache.has(ayar.YetkiliRolleri.BanHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.Emojiler.no);

    let banLimit = limit.get(`banLimit.${message.author.id}.${message.guild.id}`);
    let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let kullanicifetch = client.users.fetch(args[0]);
    let reason = args.splice(1).join(" ");
    if (!kullanici || reason.length < 1) return message.channel.send(embed.setDescription(`Geçerli bir üye ve sebep belirtmelisin!`)).then(x => x.delete({timeout: 10000}));
    if (message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(embed.setDescription(`Bu üyenin yetkileri senden yüksek veya aynı yetkide olduğunuz için işlemi gerçekleştiremiyorum.`)).then(x => x.delete({timeout: 10000}));
    if (kullanici.user.bot) return message.channel.send(embed.setDescription(`Bu komutu botlar üzerinde kullanamazsın!`)).then(x => x.delete({timeout: 10000}));
    
    if (banLimit >= 5) {
        message.guild.owner.send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı yetkili 30 dkda 5 tane ban attığı için ban yetkisi alındı.`)).catch();
        message.member.roles.remove(ayar.YetkiliRolleri.BanHammer).catch();
        limit.delete(`banLimit.${message.author.id}.${message.guild.id}`);
        return;
    }

    message.guild.members.ban(kullanicifetch.id, {reason: reason}).catch();
    kullanici.send(embed.setDescription(`**${message.guild.name}** adlı sunucudan **${reason}** gerekçesiyle yasaklandın!`)).catch();
    let cezaID = cdb.get(`cezaid.${message.guild.id}`)+1
    cdb.push("bans", {id: kullanici.id});
    cdb.add(`cezaid.${message.guild.id}`, +1);
    cdb.set(`punishments.${cezaID}.${message.guild.id}`, { mod: message.author.id, sebep: reason, kisi: kullanici.id, id: cezaID, zaman: Date.now(), komut: "BAN" });
    cdb.push(`sicil.${kullanici.id}.${message.guild.id}`, { mod: message.author.id, sebep: reason, id: cezaID, zaman: Date.now(), komut: "BAN" });
    pdb.add(`cezapuan.${kullanici.id}.${message.guild.id}`, +50);
    pdb.add(`ban.${kullanici.id}.${message.guild.id}`, +1);
    if (!message.member.hasPermission("ADMINISTRATOR")) { limit.add(`banLimit.${message.author.id}.${message.guild.id}`, +1)};
  message.react(ayar.Emojiler.yes);
  client.channels.cache.get(ayar.LogKanallari.BanLogID).send(embed.setDescription(`${kullanici} (\`${kullanici.id}\`) adlı üye **${reason}** sebebi ile ${message.author} (\`${message.author.id}\`) tarafından sunucudan yasaklandı. \n Ceza ID : **#${cezaID}**`));
  message.channel.send(embed.setDescription(`${kullanici} (\`${kullanici.id}\`) adlı üye **${reason}** sebebi ile ${message.author} (\`${message.author.id}\`) tarafından sunucudan yasaklandı. \n Ceza ID : **#${cezaID}**`)).then(x => x.delete({timeout: 10000}));
};

module.exports.configuration = {
    name: "infaz",
    aliases: ["infaz"],
    usage: "ban @üye [sebep]",
    description: ""
};
