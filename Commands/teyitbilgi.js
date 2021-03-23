const {  Discord, MessageEmbed  } = require("discord.js");
const db = require("quick.db");
const ayar = require("../settings.json");
const rdb = new db.table("teyitler");
module.exports.execute = async (client, message, args) => {
	
	
  if(!message.member.roles.cache.has(ayar.YetkiliRolleri.RegisterHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.Emojiler.no);

  let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  

let hedefKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

let kızTeyit = rdb.fetch(`reg.${hedefKişi.id}.kadin`) || "0"
let erkekTeyit = rdb.fetch(`reg.${hedefKişi.id}.erkek`) || "0";
let topTeyit = rdb.fetch(`reg.${hedefKişi.id}.toplam`) || "0";

if (!args[1]) {
message.react(ayar.Emojiler.yes)
message.channel.send(embed.setDescription(`
${hedefKişi} (\`${hedefKişi.id}\`) toplam **${topTeyit}** kayıt yapmış! (**${erkekTeyit}** erkek, **${kızTeyit}** kadın)
`))
return;
}
};

module.exports.configuration = {
    name: "teyitbilgi",
    aliases: [],
    usage: "teyitbilgi",
    description: ""
};
