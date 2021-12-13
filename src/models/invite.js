const { Permissions } = require("discord.js")
const {inviteChannel} = require('../../config.json')
const {Invitation} = require('../service/mongo');
const typeToRole = require("../utils/typeToRole");

const addInvite = async (invite, type, roles) => {
     if (invite) {
          if (roles) {
               roles = [roles]
               console.log(roles);
          }
          else {
               roles = []
          }
          if (type) {
               let role = await typeToRole(invite.guild, type);
               roles.push(role.sort().shift())
          }
          Invitation.create({
               _id: Math.random(),
               inviteReason: invite.reason,
               inviteCode: invite.code,
               inviteRole: roles,
               usesCount: invite.uses,
               state: 'active',
               guildID: invite.guild.id
          }, err => {
               if (err) console.log(err)
          })
     }
}

const getChange = async guild => {
     let invites = await guild.invites.fetch();
     let result = await invites.map(async invite => {
         let invitation = await Invitation.findOne({
              inviteCode: invite.code,
              state: 'active',
              guildID: guild.id
          }).exec();
          if (invitation.usesCount !== invite.uses) {
              return {
                    invitation,
                    usesCount: invite.uses
              }
          }
     })
     return await Promise.all(result);
}

const syncInvite = async (guild)=> {
     let invites = await guild.invites.fetch();
     let invitations = await Invitation.find({}).exec();

     invitations.forEach(async invitation => {
          if (!invites.find(element => element.code === invitation.inviteCode)){
               await Invitation.updateOne({
                    inviteCode: invitation.inviteCode,
                    guildID: guild.id
               }, 
               {state: 'inactive'})
          }
     })

     invites.forEach(invite => {
          if (!invitations.find (element => element.inviteCode === invite.code)){
               addInvite(invite, 'member').then()
          }
     })
}

const updateInvite = (invitation, usesCount) => {
     Invitation.updateOne(invitation, {usesCount}).then()
}

const invite = async (interaction, options) => {
     let invite;
     if (interaction.memberPermissions.has(Permissions.FLAGS.CREATE_INSTANT_INVITE)){
          try {
               if (options === undefined) throw 'Options is not undefined!'
               let channels = await interaction.guild.channels.fetch();
               channels.map(channel => {
                    if (channel.name === inviteChannel){
                         invite = interaction.guild.invites.create(channel.id, options).then(res => res);
                    }
               })
          }
          catch (err0r) {
               console.error(err0r)
          }
     }
     return invite;
}

const show = async () => {
     let invitations = await Invitation.find({state: 'active'}).exec();
     return invitations;
}

const event = (client) => {
     client.on('inviteDelete', invite => {
          Invitation.updateOne({
               inviteCode: invite.code,
               guildId: invite.guild.id
          },
          {
               state: 'inactive'
          }).then()
     })
}

const options = (maxAge = 1800, maxUser = 0, temporary = false) => {
     return {
          maxAge,
          maxUser,
          unique: true,
          temporary
     }
}

module.exports = {
     getChange,
     syncInvite,
     addInvite,
     updateInvite,
     invite,
     show,
     event,
     options
}