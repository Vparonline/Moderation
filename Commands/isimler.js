const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
	
 
 if (!message.member.roles.cache.has(ayar.YetkiliRolleri.RegisterHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.Emojiler.no);

    let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let data = kdb.get(`isimler.${member.id}`);
    let listedData = data.length > 0 ? data.map((value, index) => `\`${index + 1}.\` ${value.guildName} (<@&${value.Komut}>) `) : "Bu Üyenin İsim Geçmişi Bulunamadı.";
    message.channel.send(embed.setDescription(`${listedData.join("\n")}`));

    
};

module.exports.configuration = {
    name: "isimler",
    aliases: ["isimler"],
    usage: "isimler / isimler @üye",
    description: "Belirtilen üyenin geçmiş isimlerine bakarsınız."
};