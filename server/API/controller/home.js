const homecontroller=(req,res)=>{
    res.status(200).json({
        authenticated:true,
        message:"User Successfully Created!!",
        user:req.user,
        cookies:req.cookies
    })
};

module.exports = {
    homecontroller
}