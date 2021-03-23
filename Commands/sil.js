const Discord = require('discord.js');
const ayar = require("../settings.json");

module.exports.execute = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.Emojiler.no);
  if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.channel.send(new Discord.MessageEmbed().setDescription("1-100 arasında silinecek mesaj miktarı belirtmelisin!"));
  await message.delete().catch();
  message.react(ayar.Emojiler.yes)     
  message.channel.bulkDelete(Number(args[0])).then(msjlar => message.channel.send(new Discord.MessageEmbed().setDescription(`Başarıyla **${msjlar.size}** adet mesaj silindi!`))).then(x => x.delete({ timeout: 5000 }));
};
module.exports.configuration = {
    name: "sil",
    aliases: [],
    usage: "sil miktar",
    description: "Belirtildiği miktar kadar mesaj siler."
};