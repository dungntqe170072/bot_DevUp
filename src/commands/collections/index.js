const fs = require('fs');

const fileCollections = fs.readdirSync('./src/commands/collections').filter(file => file.endsWith('.js') && !file.startsWith('index'));

module.exports = (client) =>{
     client.on('interactionCreate', async interaction => {
          if (!interaction.isCommand()) return;
          try{ 
               if (!fileCollections.includes(`${interaction.commandName}.js`)) {
                    interaction.reply('This command don\'t have scrip');
               }
               else {
                    const command = require(`./${interaction.commandName}.js`);
                    await command.execute(interaction);
               }
          }
          catch(e) {
               console.log(e);
               interaction.reply('error');
          }
     })
}