const Discord = require("discord.js");
const ayar = require("../settings.json");
module.exports.execute = async(client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return;
let rol 
const etiket = message.mentions.roles.first()
const id = message.guild.roles.cache.get(args[0])
const isim = message.guild.roles.cache.find(m => m.name === args.slice(0).join(" "))

if(etiket){
rol = etiket
}
if(id){
rol = id
}
if(isim){
rol = isim
}
if(!etiket && !id && !isim){
message.reply("Bir rol etiketle veya idsini yaz.").then(x => x.delete({timeout: 5000}))
}
const aktif = rol.members.filter(m => m.presence.status !== "offline").size
const toplam = rol.members.size
if(rol.members.size < 999){
message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription("Roldeki Aktif Üye Sayısı: "+aktif+"\nRoldeki Toplam Üye Sayısı: "+toplam+"\n\nBu Role Sahip Olanlar:\n"+rol.members.map(m => m).join("\n")))
}
}
module.exports.configuration = {
    name: "roldekiler",
    aliases: [],
    usage: "roldekiler",
    description: ""
};