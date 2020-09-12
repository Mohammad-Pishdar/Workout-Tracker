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
            required: "You have to enetr the type of excercise you want to start (eg. cardio, resistance, etc)"
        },
        name: {
            type: String,
            trim: true,
            required: "Please also enter the name of the exercise"
        },
        duration: {
            type: Number,
            required: "How long the duration of the exercise should be (in minutes)"
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
});

// adds a dynamically-created property to schema

UserSchema.methods.calculateTotalDuration = function () {
    return this.exercises.reduce((totalDuration, exercise) => {
        return totalDuration + exercise.duration;
    }, 0);
};


const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;