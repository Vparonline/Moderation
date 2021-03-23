const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const pdb = new qdb.table("puanlar");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
	

  let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    if (!message.member.roles.cache.has(ayar.YetkiliRolleri.JailHammer) && !message.member.hasPermission("ADMINISTRATOR"))  return message.react(ayar.Emojiler.no);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1).join(" ");
    if (!member || reason.length < 1) return message.channel.send(embed.setDescription(`Geçerli bir üye ve sebep belirtmelisin!`)).then(x => x.delete({timeout: 10000}));
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(embed.setDescription(`Bu üyenin yetkileri senden yüksek veya aynı yetkide olduğunuz için işlemi gerçekleştiremiyorum.`)).then(x => x.delete({timeout: 10000}));
    if (member.user.bot) return message.channel.send(embed.setDescription(`Bu komutu botlar üzerinde kullanamazsın!`)).then(x => x.delete({timeout: 10000}));
    
    member.roles.cache.has(ayar.Roller.BoosterRol) ? member.roles.set([ayar.Roller.BoosterRol, ayar.Roller.JailRol]) : member.roles.set([ayar.Roller.JailRol]);
    let cezaID = cdb.get(`cezaid.${message.guild.id}`)+1
    cdb.add(`cezaid.${message.guild.id}`, +1);
    cdb.push("jail", { id: member.id });
    cdb.set(`punishments.${cezaID}.${message.guild.id}`, { mod: message.author.id, sebep: reason, kisi: member.id, id: cezaID, zaman: Date.now(), komut: "JAIL" });
    cdb.set(`jstatus.${member.id}.${message.guild.id}`, true)
    cdb.push(`sicil.${member.id}.${message.guild.id}`, { mod: message.author.id, sebep: reason, id: cezaID, zaman: Date.now(), komut: "JAIL" });
    pdb.add(`cezapuan.${member.id}.${message.guild.id}`, +15);
    pdb.add(`jail.${member.id}.${message.guild.id}`, +1);

    if (member.voice.channel) member.voice.kick();
    message.react(ayar.Emojiler.yes)
    message.channel.send(embed.setDescription(`${member} adlı üye **${reason}** sebebi ile ${message.author} tarafından cezalıya gönderildi. \n Ceza ID : **#${cezaID}**`));
    if (message.guild.channels.cache.has(ayar.LogKanallari.JailLogID)) message.guild.channels.cache.get(ayar.LogKanallari.JailLogID).send(embed.setDescription(`${member} adlı üye **${reason}** sebebi ile ${message.author} tarafından cezalıya gönderildi! \n Ceza ID : **#${cezaID}**`))

};

module.exports.configuration = {
    name: "jail",
    aliases: [],
    usage: "jail @üye [sebep]",
    description: "Belirtilen üyeyi sunucuda hiç bir yeri göremeyecek şekilde cezalandırır."
};
