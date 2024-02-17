const mongoose = require('mongoose')

const isaaSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        results:{
        social_relationship_and_reciprocity:
        Array,
        emotional_responsiveness:
        Array,
        speech_language_and_communication:
        Array,
        behaviour_patterns:
        Array,
        sensory_aspects:
        Array,
        cognitive_component:
        Array
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('isaaresult',isaaSchema)