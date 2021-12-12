module.exports = {
     maxAge: (day = 0, hour = 0, minute = 0, second  = 0) => {
          if (day === 0 && hour === 0 && minute === 0, second === 0)  {
               return 30 * 60;
          }
          return day * 86400 + hour * 3600, + minute * 60 + second;
     }
}