const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json");
module.exports = (oldUser, newUser) => {

    if (oldUser.username === newUser.username || oldUser.bot || newUser.bot) return;
    let sunucu = client.guilds.cache.get(ayar.GenelAyarlar.GuildID);
    let xyz = sunucu.members.cache.get(oldUser.id);
    let family = sunucu.roles.cache.get(ayar.Roller.FamilyRol);
    if (!xyz) return;

    let aldi = new MessageEmbed().setAuthor(sunucu.name, sunucu.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("GREEN").setTimestamp();
    let verdi = new MessageEmbed().setAuthor(sunucu.name, sunucu.iconURL({dynamic: true})).setFooter(ayar.GenelAyarlar.setFooter).setColor("RED").setTimestamp();
        if (!oldUser.username.includes(ayar.GenelAyarlar.Tag) && newUser.username.includes(ayar.GenelAyarlar.Tag)) {
            xyz.roles.add(ayar.Roller.FamilyRol).catch();
            if (sunucu.channels.cache.has(ayar.LogKanallari.TagLogID)) sunucu.channels.cache.get(ayar.LogKanallari.TagLogID).send(aldi.setDescription(`${xyz} adlı üye tagımızı (\`${ayar.GenelAyarlar.Tag}\`) aldığı için kendisine ekip rolü verildi.`))
            return;
        }

        if (oldUser.username.includes(ayar.GenelAyarlar.Tag) && !newUser.username.includes(ayar.GenelAyarlar.Tag)) {
            xyz.roles.remove(xyz.roles.cache.filter(x => family.position <= x.position)).catch();         
            if (sunucu.channels.cache.has(ayar.LogKanallari.TagLogID)) sunucu.channels.cache.get(ayar.LogKanallari.TagLogID).send(verdi.setDescription(`${xyz} adlı üye tagımızı (\`${ayar.GenelAyarlar.Tag}\`) sildiği için kendisinden ekip rolü alındı.`))
            return;
        }

};

module.exports.configuration = {
    name: "userUpdate"
  }