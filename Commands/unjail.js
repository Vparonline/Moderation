const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const pdb = new qdb.table("puanlar");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
	

    let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    if (!message.member.roles.cache.has(ayar.YetkiliRolleri.JailHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.Emojiler.no); 
    let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1).join(" ");
    if (!kullanici || reason.length < 1) return message.channel.send(embed.setDescription(`Geçerli bir üye ve sebep belirtmelisin!`)).then(x => x.delete({timeout: 10000}));
    if (message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(embed.setDescription(`Bu üyenin yetkileri senden yüksek veya aynı yetkide olduğunuz için işlemi gerçekleştiremiyorum.`)).then(x => x.delete({timeout: 10000}));
    if (kullanici.user.bot) return message.channel.send(embed.setDescription(`Bu komutu botlar üzerinde kullanamazsın!`)).then(x => x.delete({timeout: 10000}));
    let ceza = cdb.get("jail") || [];


        kullanici.roles.cache.has(ayar.Roller.BoosterRol) ? kullanici.roles.set([ayar.Roller.BoosterRol, ayar.Roller.UnregisterRol]) : kullanici.roles.set([ayar.Roller.UnregisterRol]);
        if (ceza.some(x => x.id === kullanici.id)) cdb.set("jail", ceza.filter(x => x.id !== kullanici.id));
  
    message.react(ayar.Emojiler.yes)    
    message.channel.send(embed.setDescription(`${kullanici} adlı üyenin cezası **${reason}** sebebi ile kaldırıldı.`));
    if (message.guild.channels.cache.has(ayar.LogKanallari.JailLogID)) message.guild.channels.cache.get(ayar.LogKanallari.JailLogID).send(embed.setDescription(`${kullanici} (\`${kullanici.id}\`) adlı üyenin jaili ${message.author} adlı yetkili tarafından **${reason}** sebebi ile kaldırıldı.`))

};

module.exports.configuration = {
    name: "unjail",
    aliases: [],
    usage: "unjail @üye [sebep]",
    description: "Belirtilen üyenin sunucudaki cezasını kaldırır."
};
