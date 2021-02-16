const { create ,getUser ,getUserById ,deleteUser ,updateUser ,getUserByEmail } = require('./service');
const { genSaltSync , hashSync ,compareSync} = require('bcrypt');
const { sign } = require('jsonwebtoken');


module.exports = {
    createUser : (req, res) => {

        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password , salt);

        create(body ,(err , result) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'database connecton error'
                })
            }
            return res.status(200).json({
                success: 1,
                data : result
            })
           
        });


    },
    getUserById: (req , res) => {
        const id = req.params.id;
        getUserById(id , (err , results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message  : 'record not found'              
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        })
    },
    getUser: (req , res) => {
        getUser((err , results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req , res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password , salt);
        updateUser(body , (err , results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'failed update',
                })
            }
            return res.json({
                success: 1,
                message: 'update success',

            });
        });

    },
    deleteUser: (req , res) => {
        const data = req.body;
        deleteUser(data , (err , results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message : 'record not found'
                });
            }
            return res.json({
                success: 1,
                message: 'delete success'
            });
        });
    },
    login : (req , res)=> {
        const body = req.body;
        // console.log('body =>' ,body)
        getUserByEmail(body.email ,(err , results) => {
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: 'invalid email or password1'
                });
            }
            // console.log('res =>',results.password)
            const result = compareSync(body.password , results.password);
            console.log(result);
            if(result){
                results.password = undefined;
                const jwt = sign({ result:results } , "qwe123" ,{
                    expiresIn: "1h"
                }); 
                return res.json({
                    success: 1,
                    message: 'success Login',
                    token: jwt
                });
            }else{
                return res.json({
                    success: 0,
                    data: 'invalid email or password2'
                });
            }
        });

    }
}