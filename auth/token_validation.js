const { verify } = require('jsonwebtoken');

module.exports ={
    chekToken: (req , res ,next) =>{
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, "qwe123" ,(err ,deocoded) => {
                    if(err){
                        res.json({
                            success: 0,
                            message: "invalid Token"
                        })
                    }else{
                        // midleware
                        next();
                    }
            });

        }else{
            res.json({
                success: 0,
                message: "access denined!"
            })
        }

    }
}