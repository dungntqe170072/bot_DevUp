const  Mongoose  = require("mongoose");

const Schema = Mongoose.Schema;

const Invitation = new Schema({
     _id: {type: Number},
     inviteReason: {type: String},
     inviteCode: {type: String},
     inviteRole: {type: Array},
     usesCount: {type: Number},
     state: {type: String},
     guildID: {type: String}
},{
     _id: false,
     timestamps: true
})

module.exports = {
     connect: async () =>{
          try {
               await Mongoose.connect('mongodb://localhost:27017/DevUp');
               console.log('Connected!')
          }
          catch (err){
               console.log('Fail!')
               console.log(err)
          }
     },
     Invitation: Mongoose.model('Invitation', Invitation)
}