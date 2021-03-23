const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
	
		
  let embed = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    if (!message.member.roles.cache.has(ayar.YetkiliRolleri.RegisterHammer) && !message.member.hasPermission("ADMINISTRATOR"))  return message.react(ayar.Emojiler.no);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let nick = args.slice(1).filter(arg => isNaN(arg)).map(arg => arg.charAt(0).toUpperCase() + arg.slice(arg.charAt(0).length).toLowerCase()).join(" ");
    let yaziIsım = `${winnie.user.username.includes(ayar.GenelAyarlar.Tag) ? ayar.GenelAyarlar.Tag : ayar.GenelAyarlar.Tag2} ${nick} | ${yas}`

    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(embed.setDescription(`İsmini değiştirmeye çalıştığın kişi seninle aynı yetkide veya senden daha üstte olduğu için işlemi gerçekleştiremedim.`)).then(x => x.delete({timeout: 10000}));
    if(!nick) return message.channel.send(embed.setDescription("Geçerli bir isim belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    message.react(ayar.Emojiler.yes);
    member.setNickname(`${winnie.user.username.includes(ayar.GenelAyarlar.Tag) ? ayar.GenelAyarlar.Tag : ayar.GenelAyarlar.Tag2} ${nick} | ${yas}`).catch();
    message.channel.send(embed.setDescription(`${member} adlı üyenin ismi \`${yaziIsım}\` olarak değiştirildi.`)).then(x => x.delete({timeout: 10000}));
};

module.exports.configuration = {
    name: "isim",
    aliases: ["nick", "i"],
    usage: "isim @üye [isim] [yaş]",
    description: "Belirtilen üyenin sunucudaki ismini değiştirir."
};
