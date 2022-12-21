
const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    title:{
        type:String,
        required:[true, 'privide title'],
        maxlength: [100, '100 is the limit in title'],
        unique:[true, 'title already exits']
    },
    ageReq:{
        type:String,
        enum: ['G', 'PG', 'PG13', 'R', 'NC'],
        default: 'G'
    },
    category:{
        type:String,
        enum:['fiction', 'poetry', 'women', 'selfHelp', 'thriller', 'biography'],
        required:[true, 'category is required']
    },
    author:{
        type:String,
        required:[true, 'author required'],
        maxlength:[50, 'author limit 50']
    },
    feedBack:{
        type:[String]
    },
    createdBy:{
        type:String
    }
})

module.exports = mongoose.model('book', Schema)