const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
	

    let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    if (!message.member.roles.cache.has(ayar.YetkiliRolleri.VoiceMuteHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.Emojiler.no); 
    let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1).join(" ");
    if (!kullanici || reason.length < 1) return message.channel.send(embed.setDescription(`Geçerli bir üye ve sebep belirtmelisin!`)).then(x => x.delete({timeout: 10000}));
    if (message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(embed.setDescription(`Bu üyenin yetkileri senden yüksek veya aynı yetkide olduğunuz için işlemi gerçekleştiremiyorum.`)).then(x => x.delete({timeout: 10000}));
    if (kullanici.user.bot) return message.channel.send(embed.setDescription(`Bu komutu botlar üzerinde kullanamazsın!`)).then(x => x.delete({timeout: 10000}));
    
    let mutes = cdb.get("tempmute") || [];
    let vmutes = cdb.get("voicemute") || [];

    kullanici.roles.remove(ayar.Roller.MutedRol).catch();
    if (mutes.some(x => x.id === kullanici.id)) cdb.set("tempmute", mutes.filter(x => x.id !== kullanici.id));
    if (vmutes.some(x => x.id === kullanici.id)) cdb.set("voicemute", vmutes.filter(x => x.id !== kullanici.id));
    cdb.set(`mstatus.${kullanici.id}.${message.guild.id}`, false);
    cdb.set(`vstatus.${kullanici.id}.${message.guild.id}`, false);
    if (kullanici.voice.channel) kullanici.voice.setMute(false);
    message.react(ayar.Emojiler.yes)    
    message.channel.send(embed.setDescription(`${kullanici} adlı üyenin susturması **${reason}** sebebi ile kaldırıldı.`));
    if (message.guild.channels.cache.has(ayar.LogKanallari.MuteLogID)) message.guild.channels.cache.get(ayar.LogKanallari.MuteLogID).send(embed.setDescription(`${kullanici} adlı üyenin susturması **${reason}** sebebi ile ${message.author} tarafından kaldırıldı.`));
};

module.exports.configuration = {
    name: "unmute",
    aliases: [],
    usage: "unmute @üye [sebep]",
    description: "Belirtilen üyenin metin kanallarında ve ses kanallarında olan susturmasını kaldırır."
};
