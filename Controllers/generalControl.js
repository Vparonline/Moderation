const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const pdb = new qdb.table("puanlar");
const ayar = require("../settings.json");
module.exports = () => {
    setInterval(() => {
      checkingAll();
    }, 10000);
  };
  
  module.exports.configuration = {
    name: "ready"
  };

  function checkingAll() {
    let jail = cdb.get("jail") || [];
    let mute = cdb.get("tempmute") || [];
    let vmute = cdb.get("voicemute") || [];
    let bans = cdb.get("bans") || [];

    for (let jailUye of jail) {
        let kullanici = client.guilds.cache.get(ayar.GenelAyarlar.GuildID).members.cache.get(jailUye.id);
        if (kullanici && !kullanici.roles.cache.has(ayar.Roller.JailRol)) {
            kullanici.roles.cache.has(ayar.Roller.BoosterRol) ? kullanici.roles.set([ayar.Roller.BoosterRol, ayar.Roller.JailRol]) : kullanici.roles.set([ayar.Roller.JailRol]).catch();
            if (kullanici.voice.channel) kullanici.voice.kick();
        };
    };

    for (let muteUye of mute) {
        let kullanici = client.guilds.cache.get(ayar.GenelAyarlar.GuildID).members.cache.get(muteUye.id);
        if (Date.now() >= muteUye.bitis) {
            if (kullanici && kullanici.roles.cache.has(ayar.Roller.MutedRol)) kullanici.roles.remove(ayar.Roller.MutedRol).catch();
            cdb.set("tempmute", mute.filter(x => x.id !== muteUye.id));
        }else{
            if (kullanici && !kullanici.roles.cache.has(ayar.Roller.MutedRol)) kullanici.roles.add(ayar.Roller.MutedRol).catch();
        };
    };


    for (let yasak of bans) {
        let kullanici = client.guilds.cache.get(ayar.GenelAyarlar.GuildID).members.cache.get(yasak.id);
        if (kullanici) {
            kullanici.ban({reason: "Ban Kontrol"}).catch();
        };
    };

    client.guilds.cache.get(ayar.GenelAyarlar.GuildID).members.cache.filter(x => !x.user.bot && x.user.username.includes(ayar.GenelAyarlar.Tag) && !x.roles.cache.has(ayar.Roller.FamilyRol)).array().forEach((tag, index) => {
        setTimeout(() => {
            tag.roles.add(ayar.Roller.FamilyRol).catch();
        }, index*3000);
    });

    client.guilds.cache.get(ayar.GenelAyarlar.GuildID).members.cache.filter(x => !x.user.bot && x.user.username.includes(ayar.GenelAyarlar.Tag2) && !x.roles.cache.has(ayar.Roller.FamilyRol)).array().forEach((tag, index) => {
        setTimeout(() => {
            tag.roles.add(ayar.Roller.FamilyRol).catch();
        }, index*3000);
    });
	
	client.guilds.cache.get(ayar.GenelAyarlar.GuildID).members.cache.filter(x => !x.user.bot && x.user.username.includes(ayar.GenelAyarlar.Tag3) && !x.roles.cache.has(ayar.Roller.FamilyRol)).array().forEach((tag, index) => {
        setTimeout(() => {
            tag.roles.add(ayar.Roller.FamilyRol).catch();
        }, index*3000);
    });
	
	client.guilds.cache.get(ayar.GenelAyarlar.GuildID).members.cache.filter(x => !x.user.bot && x.user.username.includes(ayar.GenelAyarlar.Tag4) && !x.roles.cache.has(ayar.Roller.FamilyRol)).array().forEach((tag, index) => {
        setTimeout(() => {
            tag.roles.add(ayar.Roller.FamilyRol).catch();
        }, index*3000);
    });

};