const mongoose = require('mongoose');


exports.connect = () => {
    mongoose.connect('mongodb://localhost:27017/mean', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(res => {
            // console.log(res);
            console.log('DB CONNECTTED SUCCESSFULLY');
        })
        .catch(error => {
            console.log(error);
            console.log("DB CONNECTION FAILED");
        })
}


