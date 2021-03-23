const ms = require('ms');
const Discord = require('discord.js');
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const pdb = new qdb.table("puanlar");
const moment = require('moment');
const ayar = require("../settings.json");
require("moment-duration-format");
 
exports.execute = async(client, message, args) => {
	
    let embed = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    let sunucu = client.guilds.cache.get(ayar.GenelAyarlar.GuildID);
    if(!message.member.roles.cache.some(r => [ayar.YetkiliRolleri.ChatMuteHammer, ayar.YetkiliRolleri.VoiceMuteHammer].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.Emojiler.no);

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let embed2 = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    moment.locale('tr')
  if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(embed.setDescription(`Bu üyenin yetkileri senden yüksek veya aynı yetkide olduğunuz için işlemi gerçekleştiremiyorum.`)).then(x => x.delete({timeout: 10000}));
    let time = args[1]
    let reason = args.slice(2).join(" ") || "Sebep Belirtilmemiş";
     if(!member || !reason) return message.channel.send(embed.setDescription(`Geçerli bir üye ve sebep belirtmelisin!`)).then(x => x.delete({ timeout: 5000 }))
     if(!time) return message.channel.send(embed.setDescription(`Geçerli bir zaman belirtmelisin!`)).then(x => x.delete({ timeout: 5000 }))
   
    let yaziSure = time.replace("h", " Saat").replace("m", " Dakika").replace("d",  " Gün").replace("s", " Saniye");
    let mutezaman = ms(`${time}`)
    const filter = (reaction, user) => {
        return ['📄', '🔇'].includes(reaction.emoji.name) && user.id == message.author.id;
    };
    await message.channel.send(embed.setDescription(`${member}, adlı kullanıcıyı metin kanallarında susturmak için **📄** emojisine seste susturmak için **🔇** emojisine basınız!`)).then(async msg => {
        await msg.react("📄")
        await msg.react("🔇")
        msg.awaitReactions(filter, {
            max: 1,
            time: 15000,
            errors: ['time']
        }).then(async(collected) => {
            await msg.reactions.removeAll()
            const reaction = collected.first();
            if (reaction.emoji.name == "📄" ) {
                member.roles.add(ayar.Roller.MutedRol)
    let cezaID = cdb.get(`cezaid.${message.guild.id}`)+1
    cdb.add(`cezaid.${message.guild.id}`, +1);
    cdb.push("tempmute", { id: member.id, bitis: Date.now()+ms(time) });
    cdb.set(`punishments.${cezaID}.${message.guild.id}`, { mod: message.author.id, sebep: reason, kisi: member.id, id: cezaID, zaman: Date.now(), komut: "CHAT-MUTE" });
    cdb.set(`mstatus.${member.id}.${message.guild.id}`, true);
    cdb.push(`sicil.${member.id}.${message.guild.id}`, { mod: message.author.id, sebep: reason, id: cezaID, zaman: Date.now(), komut: "CHAT-MUTE" });
    pdb.add(`cezapuan.${member.id}.${message.guild.id}`, +10);
    pdb.add(`cmute.${member.id}.${message.guild.id}`, +1);
                return msg.edit(embed.setDescription(`${member} adlı kullanıcı ${message.author} tarafından **${reason}** sebebi ile **${yaziSure}** boyunca **metin** kanallarında susturuldu. \n Ceza ID : **#${cezaID}**`)).then(x => x.delete({timeout: 10000})).then(() => {
                    client.channels.cache.get(ayar.LogKanallari.MuteLogID).send(embed.setDescription(`${member} adlı kullanıcı ${message.author} tarafından **${reason}** sebebi ile **${yaziSure}** boyunca **metin** kanallarında susturuldu. \n Ceza ID : **#${cezaID}**`))
                    if (time) setTimeout(() => {
                        member.roles.remove(ayar.Roller.MutedRol)
                    }, mutezaman)
                })
            } else if (reaction.emoji.name == "🔇") {
                member.voice.setMute(true);
    let cezaID = cdb.get(`cezaid.${message.guild.id}`)+1
    cdb.add(`cezaid.${message.guild.id}`, +1);
    cdb.set("voicemute", { id: member.id, bitis: Date.now()+ms(time)});
    cdb.set(`punishments.${cezaID}.${message.guild.id}`, { mod: message.author.id, sebep: reason, kisi: member.id, id: cezaID, zaman: Date.now(), komut: "VOICE-MUTE" });
    cdb.set(`vstatus.${member.id}.${message.guild.id}`, true);
    cdb.push(`sicil.${member.id}.${message.guild.id}`, { mod: message.author.id, sebep: reason, id: cezaID, zaman: Date.now(), komut: "VOICE-MUTE" });
    pdb.add(`cezapuan.${member.id}.${message.guild.id}`, +10);
    pdb.add(`vmute.${member.id}.${message.guild.id}`, +1);       
                return msg.edit(embed.setDescription(`${member} adlı kullanıcı ${message.author} tarafından **${reason}** sebebi ile **${yaziSure}** boyunca **ses** kanallarında susturuldu. \n Ceza ID : **${cezaID}**`)).then(x => x.delete({timeout: 10000})).then(() => {
                    client.channels.cache.get(ayar.LogKanallari.MuteLogID).send(embed.setDescription(`${member} adlı kullanıcı ${message.author} tarafından **${reason}** sebebi ile **${yaziSure}** boyunca **ses** kanallarında susturuldu. \n Ceza ID : **${cezaID}**`))
                    if (time) setTimeout(() => {
                      member.voice.setMute(false);
                    }, mutezaman)
                })
            }
        })
    })
}
module.exports.configuration = {
    name: "mute",
    aliases: ["mute", "chatmute", "voicemute", "cmute", "vmute"],
    usage: "mute @üye [zaman] [sebep] ",
    description: ""
};
