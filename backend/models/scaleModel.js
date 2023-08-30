const mongoose = require('mongoose')

const scaleSchema = mongoose.Schema(
    {
        birth_to_five:
        Array,
        six_to_ten:
        Array,
        eleven_to_fifteen:
        Array,
        sixteen_to_twenty:
        Array,
        twentyone_to_twentyfive:
        Array,
        twentysix_to_thirty:
        Array,
        thirtyone_to_thirtyfive:
        Array,
        thirtysix_to_forty:
        Array,
        fortyone_to_fiftynine:
        Array,
        sixty_to_seventyone:
        Array,
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Scale',scaleSchema)