const { Discord, MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const pdb = new qdb.table("puanlar");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
		

  if (!message.member.roles.cache.has(ayar.YetkiliRolleri.ChatMuteHammer) && !message.member.hasPermission("ADMINISTRATOR"))  return message.react(ayar.Emojiler.no);

  let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    let cezaID = Number (args[0]);
    if (!cezaID) return message.channel.send(embed.setDescription("Geçerli bir ceza numarası belirtmelisin.")).then(x => x.delete({timeout: 5000}))
    let punishment = cdb.fetch(`punishments.${cezaID}.${message.guild.id}`) || {};
    if (!punishment) return message.channel.send(embed.setDescription(`Belirtilen ceza numarasında bir ceza dosyası bulunamadı. \`!#${cezaID}\``)).then(x => x.delete({timeout: 10000}));
    let kullanici = client.users.fetch(punishment.kisi) || punishment.kisi;
    let mod = client.users.fetch(punishment.mod) || punishment.mod;
    let zaman = punishment.zaman;

    message.channel.send(embed.setDescription(`\`#${cezaID}\` **Numaralı Ceza Dosyası;** \n\n\`•\` Ceza: **[${punishment.komut}]** \n\`•\` Ceza Alan: ${message.guild.members.cache.get(punishment.kisi) || punishment.kisi} (\`${kullanici.id || punishment.kisi}\`) \n\`•\` Yetkili: ${message.guild.members.cache.get(punishment.mod) || punishment.mod} (\`${mod.id || punishment.mod}\`) \n\`•\` Ceza Tarihi: \`${new Date(zaman).toTurkishFormatDate()}\` \n\`•\` Sebep: **${punishment.sebep}**`));

};

module.exports.configuration = {
    name: "cezabilgi",
    aliases: ["cezainfo"],
    usage: "cezabilgi ceza id",
    description: "Belirtilen ceza idli dosyanın bilgilerini atar."
};