const Workout = require("../models/workout.js")

module.exports = function (app) {

    app.get("/api/workouts", function (req, res) {
        Workout.find()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    });

    app.post("/api/workouts", function (req, res) {
        Workout.create({})
            .then(data => res.json(data))
            .catch(err => {
                console.log("err", err)
                res.json(err)
            })
    });

    app.put("/api/workouts/:id", ({
        body,
        params
    }, res) => {
        //The findByIdAndUpdate() method in mongoose is specifically used to find a document by providing the value of the auto-generated _id field and then update the content of the document. 
        Workout.findByIdAndUpdate(
                params.id, {
                    $push: {
                        exercises: body
                    }
                }, {
                    //You should set the new option to true to return the document after update was applied.
                    new: true,
                    //Mongoose also supports validation for update(), updateOne(), updateMany(), and findOneAndUpdate() operations. Update validators are off by default - you need to specify the runValidators option.
                    runValidators: true
                }
            )
            .then(data => res.json(data))
            .catch(err => {
                console.log("err", err)
                res.json(err)
            })
    });

    app.get("/api/workouts/range", function (req, res) {
        Workout.find()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    });


    app.post("/api/workouts/range", function (req, res) {
        Workout.create({})
            .then(data => res.json(data))
            .catch(err => {
                res.json(err)
            })
    });
}