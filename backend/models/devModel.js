const mongoose = require('mongoose')

const devSchema = mongoose.Schema(
    {
        "3M":
        Array,
        "6M":
        Array,
        "9M":
        Array,
        "1Y":
        Array,
        "2Y":
        Array,
        "3Y":
        Array,
        "4Y":
        Array,
        "5Y":
        Array,
        "6Y":
        Array,
        "7Y":
        Array,
        "8Y":
        Array,
        "9Y":
        Array,
        "10Y":
        Array,
        "11Y":
        Array,
        "12Y":
        Array,
        "13Y":
        Array,
        "15Y":
        Array,
    }
)

module.exports = mongoose.model('develop',devSchema)