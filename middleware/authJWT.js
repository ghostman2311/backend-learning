const jwt = require("jsonwebtoken");
const User = require("../models/User")

const verifyToken =  (req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jwt.verify(req.headers.authorization.split(" ")[1], '34dj394uiojfddkasnajkld', function(err, decode){
            if(err){
                req.user = undefined;
            }

            User.findOne({
                _id: decode.id
            }).then(user => {
                req.user = user;
                next()
            }).catch(err => {
                res.status(500).send({message: err});
            })
        })
    } else {
        req.user = undefined;
        next();
    }
}


module.exports = verifyToken