const mongoose = require('mongoose')

const socialSchema = mongoose.Schema(
    {
        "0-I": Array,
        "I-II": Array,
        "II-III": Array,
        "III-IV": Array,
        "V-VI": Array,
        "VI-VII": Array,
        "VII-VIII": Array,
        "VIII-IX": Array,
        "IX-XI": Array,
        "XII-XV": Array,
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('social',socialSchema)