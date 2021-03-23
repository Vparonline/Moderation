const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    let olumlu = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("GREEN").setTimestamp();
    let olumsuz = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setTimestamp().setColor("RED");
    if (!message.member.hasPermission("ADMINISTRATOR"))  return message.react(ayar.Emojiler.no);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    let user = args[0];
    if (!user || !member) return message.channel.send(olumsuz.setDescription(`Bir kullanıcı etiketle.`)).then(x => x.delete({timeout: 12000}));
        let vipRol = message.guild.roles.cache.get(ayar.Roller.VipRolu);
        if (!member.manageable) return message.channel.send(olumsuz.setDescription(`Bu üye üzerinde işlem gerçekleştiremiyorum.`)).then(x => x.delete({timeout: 10000}));
         if (vipRol && !member.roles.cache.has(ayar.Roller.VipRolu)) {
             member.roles.add(vipRol)
             message.channel.send(olumlu.setDescription(`${member} adlı üyeye başarılı bir şekilde ${vipRol} rolünü verdim.`))
    message.react(ayar.Emojiler.yes)    
         } 
         if (vipRol && member.roles.cache.has(ayar.Roller.VipRolu)) {
            member.roles.remove(vipRol)
            message.channel.send(olumlu.setDescription(`${member} adlı üyeden başarılı bir şekilde ${vipRol} rolünü aldım.`))
    message.react(ayar.Emojiler.yes)    
         }
};

module.exports.configuration = {
    name: "vip",
    aliases: [],
    usage: "vip @üye",
    description: "Belirtilen üyeye vip rolünü verirsiniz."
};
