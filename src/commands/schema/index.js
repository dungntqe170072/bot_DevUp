const  {Constants} = require("discord.js")
const schema = require("./schema");

module.exports = [
     schema('ping', 'Reply Pong!'),
     schema('cc', 'clear chat in this channel'),
     schema('invite', 'make link invite', [
          {
               name: 'type',
               description: 'Lời mời dành cho',
               type: Constants.ApplicationCommandOptionTypes.STRING,
               choices: [
                    {
                         name: 'Thành viên',
                         value: 'member'
                    },
                    {
                         name: 'Khách mời',
                         value: 'guest'
                    },
               ],
               required: true,
          }
     ]),
     schema('invrole', 'invite with role',[
          {
               name: 'role',
               description: 'Role give with invite',
               type: Constants.ApplicationCommandOptionTypes.ROLE,
               required: true
          },
          {
               name: 'type',
               description: 'Lời mời dành cho',
               type: Constants.ApplicationCommandOptionTypes.STRING,
               choices: [
                    {
                         name: 'Thành viên',
                         value: 'member'
                    },
                    {
                         name: 'Khách mời',
                         value: 'guest'
                    },
               ],
               required: true,
          }
     ]),
     schema('status', 'Set status for bot', [
     {
          name: 'status',
          description: 'Status of bot',
          type: Constants.ApplicationCommandOptionTypes.STRING,
          required: true,
     },
     {
          name: 'action',
          description: 'Action of bot',
          type: Constants.ApplicationCommandOptionTypes.STRING,
          choices: [
               {
                    name: 'Playing',
                    value: 'PLAYING'
               },
               {
                    name: 'Streaming',
                    value: 'STREAMING'
               },
               {
                    name: 'Listening',
                    value: 'LISTENING'
               },
               {
                    name: 'Watching',
                    value: 'WATCHING'
               },
               {
                    name: 'Competing',
                    value: 'COMPETING'
               },
          ],
          required: true,
     }
     ]),
]