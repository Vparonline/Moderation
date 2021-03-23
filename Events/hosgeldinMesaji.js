const { Discord, MessageEmbed } = require('discord.js');
const Winnie = require("discord.js");
const ayar = require("../settings.json");
const moment = require("moment");
module.exports = (member) => {

    let sunucu = client.guilds.cache.get(ayar.GenelAyarlar.GuildID);
    let logKanal = sunucu.channels.cache.get(ayar.LogKanallari.RegisterID);
    let kayitSorumlusu = sunucu.roles.cache.get(ayar.YetkiliRolleri.RegisterHammer);
	const hook = new Winnie.WebhookClient(ayar.Webhook.WebhookID, ayar.Webhook.WebhookToken);


let memberGün = moment(member.user.createdAt).format("DD");
let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık"); 
    if (member.user.bot) {
        member.roles.add(ayar.Roller.BotsRol);
    }else{
        let durum = Date.now()-member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7
              if (logKanal) hook.send(`
${member} Sunucumuza hoş geldin, seninle birlikte **${member.guild.memberCount}** kişiyiz!

Hesabın **${memberGün} ${memberAylar} ${memberTarih}** tarihinde oluşturulmuş. 

Kayıt olmak için tag alıp teyit odalarında teyit vermen gerekiyor yetkililerimiz seninle ilgilenecektir!
`);        
    if (durum) {
          member.setNickname("• Yeni Hesap")
		  client.channels.cache.get(ayar.LogKanallari.YeniHesapID).send(`${member} adlı üye sunucumuza katıldı fakat hesabı yeni açıldığı için jaile gönderildi.`)
        member.roles.set([ayar.Roller.JailRol])
      }else{
    member.setNickname("• İsim")
    member.roles.set([ayar.Roller.UnregisterRol])
  }
    };


};

module.exports.configuration = {
    name: "guildMemberAdd"
  }
