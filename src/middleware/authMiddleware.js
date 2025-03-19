import jwt from 'jsonwebtoken'

function authMiddleware ( req, res, next ){
    console.log("Middleware called");
    
    const token = req.headers['authorization'].split(' ')[1] || req.headers['authorization']

    console.log("TOKEN: "+token);
    

    if(!token) { return res.status(401).json({ message : "No Token Provided"})}

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err) { 
            console.log(err);
            
            return res.status(401).json({message : "Invalid Token."})
        }

        req.userId = decoded.id

        next()
    })
}

export default authMiddleware