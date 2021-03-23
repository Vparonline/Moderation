
const ayar = require("../settings.json");
const Discord = require("discord.js")

module.exports.execute = async (client, message, args) => {
  if(message.author.bot || message.channel.type === "dm") return;
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
   
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
      const emoji = client.emojis.cache.find(emoji => emoji.name === "tikk");
  const arrifentembed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`**Ses kanallarında ${client.emojiSayi(`${count}`)} kişi bulunmaktadır.**`)
  message.channel.send(arrifentembed)
  message.react(ayar.Emojiler.yes)
}
module.exports.configuration = {
    name: "sesli",
    aliases: ["seslisay"],
    usage: "ses",
    description: "Ses"
};