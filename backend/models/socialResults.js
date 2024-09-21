const mongoose = require('mongoose')

const socialSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        results:{
            "0-I": Array,
        "I-II": Array,
        "II-III": Array,
        "III-IV": Array,
        "IV-V": Array,
        "V-VI": Array,
        "VI-VII": Array,
        "VII-VIII": Array,
        "VIII-IX": Array,
        "IX-XI": Array,
        "XII-XV": Array,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('socialresult',socialSchema)