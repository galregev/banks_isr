const bankmodel = require('../models/bank.model');

var bankModule = {

    insertOnce: (obj) => {
        let s = new bankmodel(obj);
        return s.save();
    },

    getAll: () => {
        return new Promise(async(resolve, reject) => {
            let allBanksFromDB = await bankmodel.find();
            resolve(allBanksFromDB);
        });
    },

    gal: () => {
        let gal = bankmodel.find({ where: { _id: "5d10180653d25d790fd193b9" }});
        return gal;
    }

}

module.exports = bankModule;