const errorHandler = (err,req,res,next)=>{
    const status = res.statusCode === 200 ? 500 : res.statusCode;
    if (status === 500){
        console.log(`error : ${err.message}`.bgRed);
        res.status(status).json({errors:[{'msg':'server Error'}]})
    }else{
        res.status(status).json({errors:[{msg:err.message}]})
    } 
}


const pageNotFoundHandler = function (req, res, next) {
    res.status(404)
    throw new Error('route not found')
  }

module.exports = {errorHandler,pageNotFoundHandler}