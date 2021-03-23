  const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const pdb = new qdb.table("puanlar");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
	
	
  if(!message.member.roles.cache.has(ayar.YetkiliRolleri.RegisterHammer) && !message.member.hasPermission("ADMINISTRATOR"))  return message.react(ayar.Emojiler.no);
    let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    let winnie = args[0];
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let data = cdb.get(`sicil.${user.id}.${message.guild.id}`) || [];
    let siralama = data.length > 0 ? data.map((value, index) => `\`${index+1}.\` [**${value.komut}**] ${client.users.cache.get(value.mod) || value.mod} tarafından **${value.sebep}** nedeniyle \`${new Date(value.zaman).toTurkishFormatDate()}\` zamanında cezalandırılmış.`).join("\n") : "Bu üyenin sicili temiz!"
    message.channel.send(embed.setDescription(`${siralama}`));
    message.react(ayar.Emojiler.yes)
 
};

module.exports.configuration = {
    name: "sicil",
    aliases: [],
    usage: "sicil",
    description: "Belirtilen üyenin yediği önceki cezaları sıralarsınız."
};
