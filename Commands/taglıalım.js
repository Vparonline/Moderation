const { Discord, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
let no = client.emojis.cache.get(ayar.Emojiler.no)
let yes = client.emojis.cache.get(ayar.Emojiler.yes)
if (!message.member.hasPermission("ADMINISTRATOR")) return;

if(!args[0]) {
message.channel.send(embed.setDescription(`${no} Komutu yanlış kullandınız! ${ayar.GenelAyarlar.prefix}taglıalım aç/kapat`))
return;    
}
if (args[0] === "aç") {
if(db.fetch(`taglıAlım.${message.guild.id}`)) return message.channel.send(embed.setDescription(`${no} Taglı alım sistemi zaten aktif!`))
db.set(`taglıAlım.${message.guild.id}`, "taglıAlım")
message.channel.send(embed.setDescription(`${yes} Taglı alım sistemi aktif edildi!`))
return;    
} else if (args[0] === "kapat") {
if(!db.fetch(`taglıAlım.${message.guild.id}`)) return message.channel.send(embed.setDescription(`${no} Taglı alım sistemi zaten devre dışı!`))
db.delete(`taglıAlım.${message.guild.id}`)
message.channel.send(embed.setDescription(`${yes} Taglı alım sistemi devre dışı bırakıldı!`))
return;    
};
}

module.exports.configuration = {
    name: "taglıalım",
    aliases: [],
    usage: "taglıalım aç/kapat",
    description: "Taglı Alım Sistemini Açar/Kapatır."
};