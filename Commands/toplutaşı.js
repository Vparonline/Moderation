const { MessageEmbed } = require("discord.js");
const conf = require("../settings.json");

module.exports.execute = async (client, message, args, emoji) => {
	
	
  let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(conf.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(conf.Emojiler.no);
  let abc = args.slice(0).join(' ');
  let argskanal = message.guild.channels.cache.get(abc) || message.guild.channels.cache.find(a => a.name === abc);
  let kanallar = message.guild.channels.cache.filter(a => a.type === "voice" && a.permissionsFor(message.author).has('CONNECT'));
  let kanalsıra = kanallar.sort((x, y) => x.position-y.position).array();
  if(args[0] === "tüm") {
    try {
      message.guild.members.cache.filter(a => a.voice.channel && !a.user.bot && a.voice.channelID !== message.member.voice.channelID).array().forEach((x, index) => setTimeout(() => { x.voice.setChannel(message.member.voice.channelID ) }, index*1000));
      message.reply(`**Ses kanalında bulunan herkesi başarıyla**  \`${message.member.voice.channel.name}\`  **ses kanalına taşıyorum!**`);
	  } catch (err) {
		  return message.channel.send('Bir sorun oluştu!').then(x => x.delete(5000))
    }
  } else if(abc) {
    if(argskanal.type !== "voice" || !argskanal.permissionsFor(message.author).has('CONNECT')) return message.reply(`**Belirtilen kanala toplu taşıma işlemi yapılamaz veya kanala giriş iznin yok!**`).then(x => x.delete({timeout: 5000}));    message.member.voice.channel.members.array().forEach((x, index) => setTimeout(() => { x.voice.setChannel(argskanal.id) }, index*1000))
    message.reply(`**Bulunduğun ses kanalındaki herkesi başarıyla**  \`${argskanal.name}\`  **ses kanalına taşıyorum!**`);
  } else {
    if(!message.member.voice) return message.reply('Bu komutu kullanabilmek için bir ses kanalında bulunmalısın!').then(x => x.delete({timeout: 5000}))
    if(message.member.voice.channel.members.size < 2) return message.reply('Bu komutu kullanabilmen için ses kanalında birden fazla üye bulunmalı!').then(x => x.delete({timeout: 5000}));
    message.channel.send(kanalsıra.map((x, index) => `${index+1}-) ${x.name}`).join('\n') + '\n\n30 saniye içinde, kanalındaki kişilerin taşınacağı ses kanalının numarasını girmelisin!', {code: "css", split: true})//.then(x => x.delete({timeout: 30000}));
    try {
      var filter = m => m.author.id === message.author.id && Number(m.content) < kanallar.size
      message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']}).then((collected) => {
        if(isNaN(collected.first().content)) return message.reply(`${emoji("uyarı")} **Geçerli bir ses kanalı numarası belirtmelisin!**`).then(x => x.delete({timeout: 5000}));
        message.member.voice.channel.members.array().forEach((x, index) => setTimeout(() => { x.voice.setChannel(kanalsıra[Number(collected.first().content)-1].id) }, index*1000));
        message.reply(`**Bulunduğun ses kanalındaki herkesi**  \`${kanalsıra[Number(collected.first().content)-1].name}\`  **ses kanalına taşıyorum!**`);
      });
	  } catch (err) {
		  return message.channel.send('30 saniye içinde oda belirtmediğiniz için işlem iptal edilmiştir!')
    }
  };
};
module.exports.configuration = {
  name: "toplutaşı",
  aliases: ['toplu-taşı'],
  usage: "toplutaşı",
  description: "Toplu ses taşıma."
};