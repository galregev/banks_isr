const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const BankModel = new Schema({
    Bank_Code: { type: []},
    Bank_Name:{ type: []},
    Branch_Code:{ type: []},
    Branch_Name: { type: []},
    Branch_Address: { type: []},
    City: { type: [],},
    Zip_Code: { type: [],},
    POB: { type: [],},
    Telephone: { type: [],},
    Fax: { type: [] },
    Free_Tel: { type: [] },
    Handicap_Access: { type: [] },
    day_closed: { type: []  },
    Branch_Type: { type: []  },
    Date_Open: { type: []  },
    Date_Closed: { type: []  },
    Merge_Bank: { type: []  },
    Merge_Branch: { type: []  },
    X_Coordinate: { type: [] },
    Y_Coordinate: { type: []},
});

const bankModel = mongoose.model('bank', BankModel);
module.exports = bankModel;