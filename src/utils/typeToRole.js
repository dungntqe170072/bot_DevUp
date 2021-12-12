module.exports = async (guild, type) => {
     if (!type) {
          console.error('type is not undefined!')
          return;
     }
     let roles = await guild.roles.fetch();
     let result = await roles.map(role => {
          if(role.name === type){
               return role.id;
          }
     })

     return await Promise.all(result)
}