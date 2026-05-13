const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    
    const authHeader = req.headers['authorization']

    if(!authHeader) {
        return res.status(403).json({success:false,message:"ACCESS DENIED: No token provided."})
    }

    const token = authHeader.split(' ')[1]
    if(!token) {
        return res.status(403).json({success:false,message:"ACCESS DENIED: Malformed token."})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '4f4026571012e885')

        req.user = decoded

        next()
    } catch(err) {
        return res.status(401).json({success:false,message:`ACCESS DENIED: Invalid or expired token: ${err.message}`})
    }
}

module.exports = { verifyToken }