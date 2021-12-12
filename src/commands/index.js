const collections = require('./collections');
const schema = require('./schema');

module.exports = client => {
     client.application.commands.set(schema)
          .then(commands => {
               commands.map(command => {
                    console.log(`command: \'${command.name}\' are ready!`);
               })
               collections(client);
          })
          .catch(console.error)
}