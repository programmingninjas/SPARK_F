const mongoose = require('mongoose')

const physicalSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    results:{
    physicalResult:{
        type:Number,
        required: [true,"Please add a name"]
    }
}
},{
    timestamps: true
})

module.exports = mongoose.model('Physicaltime',physicalSchema)