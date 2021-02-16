const connection = require('../../config/database');
module.exports = {
    create : (data , callback) => {

        connection.query(`insert into registration values(? ,? ,? ,? ,? ,? ,?)`,[null,data.firstName , data.lastName , data. gender , data.email , data.password , data.number] , (err , results ,fields) => {

            if(err){
               return callback(err);
            }
            return callback(null  ,results);
            
        });
    },
    getUser: callback => {
        connection.query(
            `select * from registration`, [] , (err , results , fields) => {
                if(err){
                   return callback(err);
                }
                return callback(null , results);
            });
    },
    getUserById: (id ,callback) => {
        connection.query(`select * from registration where id = ?`, [id] , (err , results , fields) => {
            if(err){
            return  callback(err);
            }
            return callback(null , results[0]);
        });
    },
    updateUser: (data , callback) => {
        connection.query(`update registration set  firstName = ? , lastName = ? , gender = ? , email = ? , password = ? , number =? where id = ?`,[data.firstName , data.lastName , data. gender , data.email , data.password , data.number , data.id] , (err , results , fields) => {
            if(err){
                return callback(err);
            }
            return callback(null , results[0]);
        });
    },
    deleteUser : (data , callback) => {
        connection.query(`delete from registration where id = ?` , [data.id] , (err , results , fields) => {
            if(err){
                return callback(err);
            }
            return callback(null , results);
        })
    },
    getUserByEmail: (email , callback) => {
        connection.query(`select * from registration where email = ?` ,[email] , (err , results , fields) => {
            if(err){
                return callback(err);
            }
            // console.log('hasil =>',results[0]);
            return callback(null , results[0]);
        })
    }
}