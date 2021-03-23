const Discord = require("discord.js");
const qdb = require('quick.db');
const ayar = require("../settings.json");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");

module.exports.execute = (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(ayar.YetkiliRolleri.RegisterHammer))  return message.react(ayar.Emojiler.no);

  let embedx = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
  let winnie = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!winnie) return message.channel.send(embedx.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  let nick = args.slice(1).filter(arg => isNaN(arg)).map(arg => arg.charAt(0).toUpperCase() + arg.slice(arg.charAt(0).length).toLowerCase()).join(" ");
  let yas = args[2];
  if(!nick || !yas) return message.channel.send(embedx.setDescription("Geçerli bir isim ve yaş belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  
if(qdb.fetch(`taglıAlım.${message.guild.id}`)) {
  if(!winnie.roles.cache.has(ayar.Roller.FamilyRol) && !winnie.roles.cache.has(ayar.Roller.VipRolu) && !winnie.roles.cache.has(ayar.Roller.BoosterRol)) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`${winnie}, Adlı kullanıcı tagımızı almadığı için kayıt tamamlanamadı!`)).then(x => x.delete({timeout: 10000}));
   
} 
 
  winnie.setNickname(`${winnie.user.username.includes(ayar.GenelAyarlar.Tag) ? ayar.GenelAyarlar.Tag : ayar.GenelAyarlar.Tag2} ${nick} | ${yas}`)
  
  
  const embed = new Discord.MessageEmbed()
  .setDescription(`<@${winnie.user.id}> adlı kullanıcının ismi başarıyla \`${winnie.user.username.includes(ayar.GenelAyarlar.Tag) ? ayar.GenelAyarlar.Tag : ayar.GenelAyarlar.Tag2} ${nick} | ${yas}\` olarak güncellendi.`)
  .setColor("GOLD")
  message.channel.send(embed).then(async mesaj => {
    message.react(ayar.Emojiler.erkek) 
    message.react(ayar.Emojiler.kadin)
    
    const erkekemoji = (reaction, user) => reaction.emoji.id === ayar.Emojiler.erkek && user.id === message.author.id;
    const kadinemoji = (reaction, user) => reaction.emoji.id === ayar.Emojiler.kadin && user.id === message.author.id;
    
    const erkek = message.createReactionCollector(erkekemoji, { time: 10000 });
    const kadin = message.createReactionCollector(kadinemoji, { time: 10000 });
    
    erkek.on('collect', async () => {
      message.reactions.removeAll()
      message.react(ayar.Emojiler.yes)
      winnie.roles.add(ayar.Roller.ErkekRol1)
      winnie.roles.add(ayar.Roller.ErkekRol1)
      winnie.roles.add(ayar.Roller.ErkekRol2)
      winnie.roles.add(ayar.Roller.ErkekRol2)
      winnie.roles.add(ayar.Roller.ErkekRol3)
      winnie.roles.add(ayar.Roller.ErkekRol3)
      winnie.roles.remove(ayar.Roller.UnregisterRol)
      winnie.roles.remove(ayar.Roller.UnregisterRol)
      winnie.roles.remove(ayar.Roller.UnregisterRol)

      rdb.add(`reg.${message.author.id}.erkek`, +1);
      rdb.add(`reg.${message.author.id}.toplam`, +1);
      kdb.push(`isimler.${winnie.id}`, {
          guildName: `${winnie.user.username.includes(ayar.GenelAyarlar.Tag) ? ayar.GenelAyarlar.Tag : ayar.GenelAyarlar.Tag2} ${nick} | ${yas}`,								
          Komut: ayar.Roller.ErkekRol1
      });

    const erkekembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`<@${winnie.user.id}> adlı üye başarıyla **erkek** olarak kayıt edildi.`)
    mesaj.edit(erkekembed).then(x => x.delete({timeout: 10000}));
    })
    
    kadin.on('collect', async () => {
      message.reactions.removeAll()
      message.react(ayar.Emojiler.yes)
      winnie.roles.add(ayar.Roller.KadinRol1)
      winnie.roles.add(ayar.Roller.KadinRol1)
      winnie.roles.add(ayar.Roller.KadinRol2)
      winnie.roles.add(ayar.Roller.KadinRol2)
      winnie.roles.add(ayar.Roller.KadinRol3)
      winnie.roles.add(ayar.Roller.KadinRol3)      
      winnie.roles.remove(ayar.Roller.UnregisterRol)
      winnie.roles.remove(ayar.Roller.UnregisterRol)

      rdb.add(`reg.${message.author.id}.kadin`, +1);
      rdb.add(`reg.${message.author.id}.toplam`, +1);
      kdb.push(`isimler.${winnie.id}`, {
        guildName: `${winnie.user.username.includes(ayar.GenelAyarlar.Tag) ? ayar.GenelAyarlar.Tag : ayar.GenelAyarlar.Tag2} ${nick} | ${yas}`,								
        Komut: ayar.Roller.KadinRol1
      });

      const kadinembed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${winnie.user.id}> adlı üye başarıyla **kadın** olarak kayıt edildi.`)
  
      mesaj.edit(kadinembed).then(x => x.delete({timeout: 10000}));
    })
})
}
module.exports.configuration = {
    name: "kayıt",
    aliases: ["e", "k", "erkek", "kadin"],
    usage: "erkek @üye [isim] [yaş]",
    description: "Belirtilen üyeyi sunucuya kayıt edersiniz."
};
