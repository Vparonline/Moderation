const Discord = require("discord.js");
const db = require('quick.db')
const ayarlar = require("../settings.json")
const moment = require("moment");
const ms = require('ms')
exports.execute = async(client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.Emojiler.no); 
  let enAltYetkiliRolü = message.guild.roles.cache.get(ayarlar.YetkiliRolleri.RegisterHammer); 
  let unses = message.guild.members.cache.filter(s => !s.user.bot && !s.voice.channel && s.roles.highest.position >= enAltYetkiliRolü.position && s.presence.status !== "offline").array()


  if(!args[0]) {
  message.channel.send(`Merhaba arkadaşlar sunucumuzda her hangi bir ses kanalında değilsiniz lütfen bir ses kanalına giriş yapınız. Bu uyarıyı dikkate almayan kişilerin yetkileri yetki yükseltme sırasında göz önünde bulundurulacaktır.
 \n ${unses.join("")} \n\n Seste olmayan yetkili sayısı : ${unses.length}`)
}


};

module.exports.configuration = {
    name: "yetkilises",
    aliases: [],
    usage: "yetkilises",
    description: ""
};
