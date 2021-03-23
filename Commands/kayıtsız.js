const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    if (!message.member.hasPermission("ADMINISTRATOR"))  return message.react(ayar.Emojiler.no);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!member) return message.channel.send(embed.setDescription(`Kayıtsıza atacağım üyeyi etiketle.`)).then(x => x.delete({timeout: 10000}));
    if(member.manageable) member.setNickname(member.user.username).catch();
			let erkekRol = message.guild.roles.cache.get(ayar.Roller.UnregisterRol);
            if (erkekRol) {
                member.roles.cache.has(ayar.Roller.BoosterRol) ? member.roles.set([ayar.Roller.BoosterRol, ayar.Roller.UnregisterRol]) : member.roles.set([ayar.Roller.UnregisterRol]);
            };
            if (member.user.username.includes(ayar.GenelAyarlar.Tag) && !member.roles.cache.has(ayar.Roller.FamilyRol)) {
                member.roles.add(ayar.Roller.FamilyRol);
            }
    
    message.channel.send(embed.setDescription(`${member} adlı üye <@${message.author.id}> tarafından kayıtsıza atıldı!`)).then(x => x.delete({timeout: 10000}));
    message.react(ayar.Emojiler.yes)    
}

module.exports.configuration = {
    name: "kayıtsız",
    aliases: ["kayıtsız"],
    usage: "kayıtsız @üye [isim] [yaş]",
    description: "Belirtilen üyeyi sunucuya kayıtsız olarak kaydını gerçekleştirmiş olursunuz."
};
