const authCheck=(req,res,next)=>{
    if(!req.user){
        res.status(401).json({
            authenticate:false,
            message:"User Not has been authenticated!!"
        })
    }else{
        next()
    }
}

module.exports ={
    authCheck
}