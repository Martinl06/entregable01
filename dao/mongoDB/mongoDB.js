const mongoose = require('mongoose')


class MongoManagerDB{
    constructor(url){
    this.url = url
    }

    connectionMongoDB() {
        return mongoose.connect(this.url, {useUnifiedTopology: true, useNewUrlParser: true })
         .then(connect => {console.log('connected to mongodb..')
         })
         .catch(err => console.log('could not connect to mongodb', err))
     }

}


module.exports = MongoManagerDB;