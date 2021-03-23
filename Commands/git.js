const Discord = require("discord.js")
const ayar = require("../settings.json")

module.exports.execute = async (client, message, args) => {
		

    if (!message.member.voice.channel) return message.channel.send("Bir ses kanalında olman gerek").then(x => x.delete(5000))
    let Kullanici = message.mentions.members.first();
    if (!Kullanici.voice.channel) return message.channel.send("Bu kullanıcı herhangi bir ses kanalında değil").then(x => x.delete(5000))
    if (!Kullanici) return message.channel.send("Kullanıcı belirtmedin").then(x => x.delete(5000))
    if (message.member.voice.channel.id === Kullanici.voice.channel.id) return message.channel.send("Zaten aynı kanaldasınız").then(x => x.delete(5000))

    const filter = (reaction, user) => {
        return [ayar.Emojiler.yes, ayar.Emojiler.no].includes(reaction.emoji.id) && user.id === Kullanici.id;
    };
    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${Kullanici}, ${message.author}  **___${Kullanici.voice.channel.name}___** odasına gelmek istiyor. Kabul ediyormusun?`)

    let mesaj = await message.channel.send(embed)
    await mesaj.react(ayar.Emojiler.yes)
    await mesaj.react(ayar.Emojiler.no)
    mesaj.awaitReactions(filter, {
        max: 1,
        time: 30000,
        errors: ['time']
    }).then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.id === ayar.Emojiler.yes) {   
            let embed2 = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${message.author}, ${Kullanici}'in bulunduğu olduğu odaya çekildi`)
            message.channel.send(embed2).then(x => x.delete({timeout: 5000}));
           message.member.voice.setChannel(Kullanici.voice.channel)
        } else {
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`${Kullanici} odaya çekilme teklifini reddetti`)
            message.channel.send(embed).then(x => x.delete({timeout: 5000}));
        }
    })
  
}

module.exports.configuration = {
    name: "git",
    aliases: [],
    usage: "git @üye [isim] ",
    description: "Git"
};