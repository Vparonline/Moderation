const Discord = require("discord.js");
const ayar = require("../settings.json");

module.exports.execute = async (client, message, args) => {


    if(!message.member.roles.cache.has(ayar.Roller.BoosterRol)) return message.react(ayar.Emojiler.no);
  let boosternick = args.slice(0).join(' ')
  if(!boosternick) return message.reply("Yeni adını girmelisin.").then(x => x.delete({timeout: 5000}));
  message.member.setNickname(`${message.author.username.includes(ayar.GenelAyarlar.Tag) ? ayar.GenelAyarlar.Tag : ayar.GenelAyarlar.Tag2} ${boosternick}`)
    const Embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag,  message.author.avatarURL({dynamic: true}))
    .setTimestamp()
    .setColor("RANDOM")
    .setDescription(`**\`•\` Takma adın başarıyla \`${message.author.username.includes(ayar.GenelAyarlar.Tag) ? ayar.GenelAyarlar.Tag : ayar.GenelAyarlar.Tag2} ${boosternick}\` olarak değiştirildi!**`) // tagi göstermesse embedde ${boosternick}'in basina ${tag} ekleyin yani; ${tag} ${boosternick}
    .setFooter(ayar.GenelAyarlar.setFooter)
    message.channel.send(Embed).then(x => x.delete({timeout: 10000}));
    message.react(ayar.Emojiler.yes);
}

module.exports.configuration = {
    name: "rich",
    aliases: ["rich", "zengin", "booster"],
    usage: "booster",
    description: ""
};
