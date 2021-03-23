const Discord = require("discord.js");
const winnie = require('../settings.json');
module.exports.execute = async (client, message, args) => {
	
	
  if (!message.member.roles.cache.has(winnie.YetkiliRolleri.RegisterHammer) && !message.member.hasPermission("ADMINISTRATOR"))  return message.react(winnie.Emojiler.no);
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === "voice");
  let count = 0
  let boostcuk = winnie.Roller.BoosterRol;
  let erkek = winnie.Roller.ErkekRol1
  let kadın = winnie.Roller.KadinRol1
  let winniekip = winnie.Roller.FamilyRol
  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
  let boost = message.guild.members.cache.filter(r => r.roles.cache.has(boostcuk)).size;
  let erkekcik = message.guild.members.cache.filter(r => r.roles.cache.has(erkek)).size;
  let kadıncık = message.guild.members.cache.filter(r => r.roles.cache.has(kadın)).size;
  let winniekipp = message.guild.members.cache.filter(r => r.roles.cache.has(winniekip)).size;
  const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(`
		Sunucumuzda ${client.emojiSayi(`${message.guild.memberCount}`)} kişi bulunmaktadır.
		Sunucumuzda ${client.emojiSayi(`${message.guild.members.cache.filter(u => u.presence.status != "offline").size}`)} aktif kişi bulunmaktadır.
		Ses kanallarında ${client.emojiSayi(`${count}`)} kişi bulunmaktadır.
		Sunucumuzu boostlayan ${client.emojiSayi(`${boost}`)} kişi bulunmaktadır.
		Sunucumuzda taglı üyede ${client.emojiSayi(`${winniekipp}`)} kişi bulunmaktadır.`
    )
    .setFooter(winnie.GenelAyarlar.setFooter)
    .setTimestamp()
    message.channel.send(embed).then(msg => msg.delete({timeout : 20000}));
    message.react(winnie.Emojiler.yes);
};
module.exports.configuration = {
    name: "say",
    aliases: [],
    usage: "say",
    description: ""
};