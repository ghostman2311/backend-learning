const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require('./models/User');

exports.signup = (req, res) => {
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save().then(() => {
        res.status(200).send({ message: "User Registered Successfully" })
    }).catch(error => {
        res.status(500).send({ message: error });
        return;
    });
}

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }

        //comparing password
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        //checking if password was valid and send response accordingly
        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid Password" });
        }

        let token = jwt.sign({ id: user.id }, '34dj394uiojfddkasnajkld', { expiresIn: 86400 });

        res.status(200).send({

            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName
            },
            message: 'Login successfull',
            accessToken: token,
        })
        
    }).catch(error => {
        if (error) {
            res.status(500).send({ message: error });
            return;
        }
    })

}