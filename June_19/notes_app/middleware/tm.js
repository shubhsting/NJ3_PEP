async function testMiddleware(req, res, next) {
    const {token} = req.headers;

    if(token == "shubham") {
        console.log("print")
        next();
    } else {
        return res.status(401).send({message:"This user is not authorised to create note"})
    }
    
}

module.exports = {testMiddleware}