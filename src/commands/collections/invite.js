const {invite, addInvite, options} = require("../../models/invite");
const { inaccess } = require("../messages/error");

module.exports = {
     execute: interaction => {
          invite(interaction, options()).then(invite => {
               const typeMember = interaction.options.get('type').value;
               interaction.reply(invite ? invite.url : inaccess)
               addInvite(invite, typeMember).then();
          })
     }
}