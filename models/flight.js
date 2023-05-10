const mongoose = require("mongoose");

// create schema
const FlightSchema = new mongoose.Schema({
    source: {
        type: String,
        required: [true, "source can not be empty."],
        maxlength: [60, "source is more than 60 characters."],
        trim: true
    },
    destination: {
        type: String,
        required: [true, "destination can not be empty."],
        maxlength: [60, "destination is more than 60 characters."],
        trim: true
    },
    airline: {
        type: String,
        required: [true, "airline can not be empty."],
        maxlength: [50, "airline is more than 50 characters."],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "price can not be empty."],
        validate: [
            function (val) {
                return (val > 0)
            },
            "{PATH} should be in greater than 0"
        ]
    },
    date: {
        type: Date,
        required: [true, "date can not be empty."],
        default: () => ( new Date() )
    }
}) 



module.exports = mongoose.model('Flight', FlightSchema);
