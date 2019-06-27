var express = require("express");
var router = express.Router();
const bankModule = require("../modules/bank.module");
BankModel = require("../models/bank.model");
const fs = require("fs");
const JSON = require("circular-json");

// INSERT DATA TO MONGODB FROM XML FILE - ONLY ONCE!
router.post("/", async (req, res) => {
  let BankData = fs.readFileSync("./store33.json", "utf8");
  let banks = JSON.parse(BankData);
  BankModel.insertMany(banks);
  res.send("Succsess!");
});

// GET All Information.
router.get("/", async (req, res, next) => {
  BankModel.find({}).limit(30).exec(function(err, events) {
    res.json(events);
  });
});

// Get from autocomplete inputs.
router.get("/auto/:name/:branch", async (req, res) => {
  BankModel.find({
    $and: [
      { Bank_Name: req.params.name },
      { Branch_Name: req.params.branch }
      //{ $or: [{Bank_Name : {$regex: req.params.name, $options: 'g'}}, { Branch_Code : {$regex: req.params.number, $options: 'g'}}]  },
      //{ Branch_Code : {$regex: req.params.number, $options: 'g'}}
    ]
  })
    .then(data => res.json(data))
    .catch(err => console.error(err));
});

// Get Only Bank names.
router.get("/names", async (req, res, next) => {
  BankModel.find({}, { Bank_Name: 1, _id: 0 }, function(err, data) {
    res.json(data);
  });
});

// Get only Branch names.
router.get("/branchs", async (req, res, next) => {
  BankModel.find({}, { Branch_Name: 1, _id: 0 }, function(err, data) {
    res.json(data);
  });
});

// Search Bank Via Bamk & Code.
router.get('/final/:name/:number', (req, res) => {

  console.log(req.params);

  BankModel.find( {
    $and: [
      { Bank_Name : req.params.name },
      { Branch_Code : req.params.number }
    ]
  })
  .then(data => {
    res.json(data);
  })
  .catch(err => console.error(err));

});

// Search Bank via bank name && Code(regex).
router.get('/nan/:name/:number', (req, res) => {

  console.log(req.params);

  BankModel.find( {
    $and: [
      { Bank_Name : req.params.name },
      { Branch_Code : {$regex: req.params.number, $options: 'g'} }
    ]
  })
  .then(data => {
    let objToSend = [];
    let Branch_Code_arr = [];
    var i = 0;

    // Get only the brach codes.
    data.forEach((theData, index) => {        
      if (Branch_Code_arr.includes(theData.Branch_Code[0].trim()) === false) {
          Branch_Code_arr.push(theData.Branch_Code[0].split("↵").join("").trim());
          objToSend[i] = Branch_Code_arr[i];
          i++;
        }
    });
    res.json(objToSend);
  })
  .catch(err => {
    console.error(err);
  })

})

// Search banks via Bank Name.
router.get("/search/:name", (req, res) => {
  let name = req.params.name;
  console.log(name);
  BankModel.find(
    { Bank_Name: { $regex: name, $options: "g" } },
    { Bank_Name: 1, _id: 0 }
  )
    .then(data => {

      let objToSend = [];
      let bank_names_arr = [];
      var i = 0;

      data.forEach((theData, index) => {        
        if (bank_names_arr.includes(theData.Bank_Name[0].trim()) === false) {
            bank_names_arr.push(theData.Bank_Name[0].split("↵").join("").trim());
            objToSend[i] = bank_names_arr[i];
            i++;
          }
      });
      res.json(objToSend);
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
