const { Permissions } = require("discord.js")
const { inaccess } = require("../messages/error")

module.exports = {
     execute: interaction => {
          if (interaction.memberPermissions.has(Permissions.FLAGS.ADMINISTRATOR)){
               interaction.channel.messages.fetch({limit: 100})
                    .then(results => {
                         interaction.channel.bulkDelete(results)
                              .then(res => interaction.reply('cleaned'))
                              .catch(err => console.error(err, 5))
                    })
          }
          else {
               interaction.reply(inaccess);
          }
     } 
}