const {invite, addInvite, options} = require('../../models/invite');
const { inaccess } = require('../messages/error');

module.exports = {
     execute: async interaction => {
          const invitation = await invite(interaction, options);
          const role = interaction.options.getRole('role');
          const typeMember = interaction.options.get('type').value;
          await addInvite(invitation, typeMember, role);
          interaction.reply(invitation ? `Uses link: ${invitation.url} to invite: ${role.name}` : inaccess)
     }
}