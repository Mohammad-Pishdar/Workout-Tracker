const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Enter an exercise type"
        },
        name: {
            type: String,
            trim: true,
            required: "Enter an exercise name"
        },
        duration: {
            type: Number,
            required: "Enter an exercise duration in minutes"
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }
    }]
}, {
    toJSON: {
        // Virtuals are typically used for computed properties on documents.By default, Mongoose does not include virtuals when you convert a document to JSON. For example, if you pass a document to Express' res.json() function, virtuals will not be included by default.To include virtuals in res.json(), you need to set the toJSON schema option to { virtuals: true }.
        virtuals: true
    }
});

// Here we use what is called a virtual schema getter function to create a virtual property for our model called "totalDuration". We use a JavaScript reduce() function that takes the array of "exercises" in our model and reduce it down to the sum of the durations of all the exercises the user has defined for that particular day.
workoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
        // Number 0 here is an optional initial value for our reduce function. It just indicates that the initial "total" parameter value of the reduce function is 0 and it should be incremented by the amount of exercise.duration property
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;