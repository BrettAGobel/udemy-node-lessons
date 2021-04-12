const db = require('../models/index.js');
const note = require('../models/note.js');
const noteModel = note(db.sequelize,  db.Sequelize.DataTypes);


const getAllNotes = (req, res) => {
    noteModel.findAll({
        where: {isDeleted: false}
    }).then((notes) => {
        res.status(200).json({
            status: 'success',
            notes: notes,
            message: ''
        })
    })
};

const createNote = (req, res) => {
    noteModel.create({
        subject: req.body.subject,
        detail: req.body.detail
    }).then ((note) => {
        res.redirect(301, 'http://localhost:3000/index.html')
    }).catch(error => {
        res.status(200).json({
            status: 'failure'
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
    deleteNote: deleteNote
};

