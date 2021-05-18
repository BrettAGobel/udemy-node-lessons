require('dotenv').config()
const db = require('../models/index.js');
const note = require('../models/note.js');
const noteModel = note(db.sequelize,  db.Sequelize.DataTypes);
const user = require ('../models/user')
const userModel = user(db.sequelize, db.Sequelize.DataTypes)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')



const signUpRedirect = (req, res) => {
    res.sendFile('C:/Users/brett/Desktop/Node-lessons/udemy-node-lessons/notely-rest-api/public/SignUp.html')
}

const signInRedirect = (req, res) => {
    res.sendFile('C:/Users/brett/Desktop/Node-lessons/udemy-node-lessons/notely-rest-api/public/SignIn.html')
}


const signUp = async (req, res) => {

    try {
        const salt = await bcrypt.genSalt()
        const hashPass = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashPass)
        await userModel.create({
            username: req.body.username,
            password: hashPass
        })
        res.status(200).json({
            status: 'success'
        })
    }
    catch (err) {
        res.status(500).json()
    }
}

// const login = async (req, res) => {
//         const user = req.body.username
//         const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     res.json({
//         accessToken
//     })
//
// }

const login = async (req, res) => {
    try {
        let user = await userModel.findOne({
            where: {
                username: req.body.username,
            }
        })
        console.log(user)
    let payload = {
            Username: user.username
    }
    let d = new Date()
        d.setTime(d.getTime() + 2*60*1000)
        bcrypt.compare(req.body.password, user.password).then((result) => {
            if (!result) {
                console.log('passwords do not match')
            } else {
                console.log('matches!')
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
                res.setHeader('auth-token', accessToken.toString())
                res.cookie('token', accessToken, {
                                secure: false, // set to true if your using https
                                httpOnly: true,
                                expires: d
                            })
                res.redirect('/')

            }
        })
    }
    catch (err) {
        console.log(err)
    }

        // then((err, matches) => {
            //     if (err) {
            //         throw err
            //     } else if (!matches) {
            //         console.log('passwords do not match')
            //     } else {
            //         console.log('matches!')
            //         const accessToken =  jwt.sign(user.username, process.env.ACCESS_TOKEN_SECRET)
            //         res.setHeader('auth-token', accessToken)
            //
            //
            //     }
            // })

//-- ATTEMPT TO STORE IN COOKIE --//

    // bcrypt.compare(req.body.password, user.password, (err, matches) => {
    //     if (err) {
    //         throw err
    //     } else if (!matches) {
    //         console.log('passwords do not match')
    //     } else {
    //         console.log('matches!')
    //         const accessToken =  jwt.sign(user.username, process.env.ACCESS_TOKEN_SECRET)
    //         res.setHeader('auth-token', accessToken)
    //         return  res.cookie('token', accessToken, {
    //             secure: false, // set to true if your using https
    //             httpOnly: true,
    //         })
    //
    //
    //     }
    // })


}

// function authenticateTokenHeader (req, res, next) {
//     console.log('beginning verification of token')
//     const authHeader = req.headers['auth-token']
//     const token  = authHeader && authHeader.split(' ')[1]
//     if (token == null) {
//         return res.sendStatus(401)
//     }
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return res.sendStatus(403)
//         }
//         req.user.username = user
//         next()
//     })
//
// }


// async function checkUser (req, res, next) {
//     const token = await req.cookies['token']
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, match) => {
//         if (err) {
//             res.json({
//                 message: "token did not match"
//             })
//         } else if (match) {
//             console.log(match)
//             let user =  userModel.findOne({
//                 where: {
//                     username: match.Username
//                 }
//             })
//             return user
//         }
//
//     }).then(user => {
//         console.log(user.id)
//         let userId =  user.id
//
//
//     })
// }





//
// function authenticateTokenCookie (req, res, next) {
//
//
//     const token  = authHeader && authHeader.split(' ')[1]
//     if (token == null) {
//         return res.sendStatus(401)
//     }
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return res.sendStatus(403)
//         }
//         req.user.username = user
//         next()
//     })
//
// }


// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token === null) return res.sendStatus(401)
//
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         req.user = user
//     })
// }


const getAllNotes = async (req, res) => {
        const token = await req.cookies['token']
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, match) => {
            if (err) {
                res.json({
                    message: "token did not match"
                })
            } else if (match) {
                console.log(match)
                let user = userModel.findOne({
                    where: {
                        username: match.Username
                    }
                })
                return user
            }

        }).then(user => {
            console.log(user.id)
            let userId = user.id

            noteModel.findAll({
                where: {userId: userId}
            }).then((notes) => {
                if (notes) {
                    return res.json({
                        notes
                    })
                 }
            })
        })
    };

const createNote = async (req, res) => {

    const token = await req.cookies['token']
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, match) => {
        if (err) {
            res.json({
                message: "token did not match"
            })
        } else if (match) {
            console.log(match)
            let user =  userModel.findOne({
                where: {
                    username: match.Username
                }
            })
            return user
        }

    }).then(user => {
        console.log(user.id)
        let userId =  user.id

        noteModel.create({
            userId: userId,
            subject: req.body.subject,
            detail: req.body.detail
        }).then ((note) => {
            res.redirect(301, 'http://localhost:3000/index.html')
        }).catch(error => {
            res.status(200).json({
                status: error
            })
        })

    })




};

// const createNote = (req, res) => {
//     noteModel.create({
//         subject: req.body.subject,
//         detail: req.body.detail
//     }).then((notes) => {
//         res.status(200).json({
//             status: 'success',
//             notes: notes,
//             message: ''
//         })
//     }).catch(note => {
//           res.status(200).json({
//               status: 'failure',
//               note: note
//          })
//      })
// };

const getNote = (req, res) => {
    noteModel.findByPk(req.params.id)
        .then((note)=> {
            res.status(200).json({
                status: 'success',
                note: note,
                message: ""

            })
        })

};

const editNote = (req, res) => {
    noteModel.update({
        subject: req.body.subject,
        detail: req.body.detail
    }, {
        where: {id: req.body.id}
    }).then((note) => {
        res.status(200).json({
            status: 'success',
            note: note,
            message: ""
        })
      })
    };

const deleteNote = (req, res) => {
    noteModel.update({
        isDeleted: true,
    }, {
        where: { id: req.params.id}
    }).then(() => {
        res.status(200).json({
            status: 'success',
            message: ""
        })
    })
};

module.exports = {
    getAllNotes: getAllNotes,
    createNote: createNote,
    getNote: getNote,
    editNote: editNote,
    deleteNote: deleteNote,
    signUp: signUp,
    signUpRedirect: signUpRedirect,
    signInRedirect: signInRedirect,
    login: login,
    // authenticateTokenHeader: authenticateTokenHeader,
    // checkUser: checkUser
};

