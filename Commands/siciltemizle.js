const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../settings.json");
const pdb = db.table("cezalar");

module.exports.execute = async (client, message, args) => {
	
  
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.Emojiler.no);
    
    
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if(!member) return message.channel.send(new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
    .setDescription(`Bir kullanıcı belirt.`)
    .setFooter(ayar.GenelAyarlar.setFooter)                                            
    .setTimestamp()
    .setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
    if(!member.roles.highest.position >= message.member.roles.highest.position) message.channel.send(new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
    .setDescription(`Belirtilen kullanıcı sizden üst/aynı pozisyonda işleme devam edilemiyor.`)
    .setFooter(ayar.GenelAyarlar.setFooter)
    .setTimestamp()
    .setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
    
      
    let bilgi = db.get(`sicil.${member.id}`);  
    db.delete(`sicil.${member.id}.${message.guild.id}`)



    message.react(ayar.Emojiler.yes)    
    message.channel.send(new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
    .setColor("0x2f3136")
    .setFooter(ayar.GenelAyarlar.setFooter)                      
    .setTimestamp()
    .setDescription(`<@${member.id}> adlı üyenin sicili <@${message.author.id}> tarafından silindi!`))

}
module.exports.configuration = {
    name: "siciltemizle",
    aliases: [],
    usage: "siciltemizle @üye",
    description: ""
};