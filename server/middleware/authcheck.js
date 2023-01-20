const authCheck=(req,res,next)=>{
    if(!req.user){
        res.status(401);
        throw new Error('Authorization Failed');
        // req.authenticate = false;
        // req.message = "User Not has been authenticated!!"
        // res.status(401).json({
        //     authenticate:false,
        //     message:"User Not has been authenticated!!"
        // })
        // next();
    }else{
        next()
    }
}

module.exports ={
    authCheck
}