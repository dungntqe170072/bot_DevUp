const Action = {
     'PLAYING': 0,
     'STREAMING' : 1,
     'LISTENING' : 2,
     'WATCHING' : 3,
     'COMPETING' : 5
}

module.exports = {
     execute: (interaction) => {
          const status = interaction.options.get('status').value;
          const action = interaction.options.get('action').value;
          interaction.client.user.setPresence({
               activities: [{ 
                    name: status,
                    type:  Action[action]
               }], 
               status: 'online' 
          });
          interaction.reply(`Bot is ${action.toLowerCase()} ${status}`);
     }
}