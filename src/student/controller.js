const pool = require('../../db');
const queries = require('./queries')


//GET all
const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });

}

//GET count
const getStudentsCount = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json({ success: true, count: results.rows.length });
    });

}

// GET single
const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

// POST 
const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;

    // check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.status(409).send("Email already exists.");
        } else {
            // add student to db
            pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
                if (error) throw error;
                res.status(201).send("Student created successfully!");
            })
        };
    });
}

// DELETE
const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student does not exist in the database.");
        } else {
            pool.query(queries.removeStudent, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Student removed successfully!")
            });
        }
    })
}

// UPDATE
const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student does not exist in the database.");
        } else {
            if (!name) {
                res.send("Please enter new info");
                return;
            }
            pool.query(queries.updateStudent, [name, id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Student updated successfully!");
            });
        }
    });
}

module.exports = {
    getStudents,
    getStudentsCount,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
}