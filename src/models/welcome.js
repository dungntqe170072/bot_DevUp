const {inviteChannel} = require('../../config.json');
const { getChange, updateInvite } = require('./invite');
const { setRole } = require('./role');

module.exports = client => {
     client.on('guildMemberAdd', async member => {
          try {
               let channels = await member.guild.channels.fetch();
               let { invitation, usesCount} = await (await getChange(member.guild)).sort().shift();

               updateInvite(invitation, usesCount)
               setRole(member, invitation.inviteRole)
               // channels.map(channel => {
               //      if (channel.name === inviteChannel) {
               //           channel.send(`Hello ${member} !!!`);
               //      }
               // }) 
          } catch (error) {
               console.error(error);
          }
     });
}