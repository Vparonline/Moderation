const { MessageEmbed } = require("discord.js");
const conf = require('../settings.json');

module.exports.execute = (client, message, args, emoji) => {

 let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return;
  if(!uye.voice.channel) return message.channel.send(new MessageEmbed ().setDescription(`${uye} (\`${uye.id}\`) adlı kullanıcı herhangi bir sesli kanalda bulunmuyor!`))
let selfMt = uye.voice.selfMute ? "Mikrofonu **Kapalı**" : "Mikrofonu **Açık**";
let selfDf = uye.voice.selfDeaf ? "Kulaklığı **Kapalı**" : "Kulaklığı **Açık**.";
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`
  ${uye} (\`${uye.id}\`) adlı kullanıcı şu anda \`${message.guild.channels.cache.get(uye.voice.channelID).name}\` adlı ses kanalında
  ${selfMt}, ${selfDf}
  `)
	message.channel.send(embed);
};
module.exports.configuration = {
    name: "seskontrol",
    aliases: ["n"],
    usage: "ses [üye]",
    description: "Belirtilen üyenin ses bilgilerini gönderir.."
};