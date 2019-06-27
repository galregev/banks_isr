const fs = require('fs');

// Parse XML to JSON.
var parseString = require('xml2js').parseString;
var https = require('https');

// Url of XML that i'll Fetch.
const url = "https://www.boi.org.il/he/BankingSupervision/BanksAndBranchLocations/Lists/BoiBankBranchesDocs/snifim_dnld_he.xml";

// Convert Function.

    var initJson = {
        objToSend: new Object(),
        xmlToJson (url, callback) {
            var req = https.get(url, function(res) {
                var xml = '';
                
                res.on('data', function(chunk) {
                xml += chunk;
                });
    
                res.on('error', function(e) {
                callback(e, null);
                }); 
    
                res.on('timeout', function(e) {
                callback(e, null);
                }); 
    
                res.on('end', function() {
                parseString(xml, function(err, result) {
                    callback(null, result);
                });
                });
            });
        },
        storeData(data, path) {
            try {
                fs.writeFileSync(path, JSON.stringify(data), {encoding: 'utf8'});
                console.log('JSON file Created!');
            } catch (err) {
                console.error(err)
            }
        },
        start: function() {
            this.xmlToJson(url, (err, data) => {
            if(err) {
                console.err(err)  
            } 
                var gal = data.BRANCHES.BRANCH;
                this.storeData(gal, 'store33.json');
            })
        },
        getObj(url) {
            let objGal = [];
            this.xmlToJson(url, (err, data) => {
                if(err) {
                    console.err(err)   
                } 
                    return data.BRANCHES.BRANCH;
                }) 
               return this.objToSend;
            }
    }


    module.exports = initJson;

