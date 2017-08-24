var curl = require("curlrequest");
var insultCompliment = require("insult-compliment");

var brands = {
    "bmw": ["3 series"],
    "chevy": ["tahoe"],
    "ford": ["explorer", "f150", "focus"],
    "honda": ["accord"],
    "lexus": ["es350"],
    "mazda": ["mazda 3", "miata"],
    "nissan": ["maxima", "rogue"],
    "toyota": ["4runner", "corolla", "camry"],
    "volvo": ["v50"]
}

var makes = {
    "3 series": "Chris Torie",
    "4runner": "Isaac Weeks",
    "accord": "Will Freeman",
    "camry": "Rob Firstman",
    "corolla": "Cameron Bennett",
    "explorer": "Peyton Bell",
    "es350": "Hamilton Wexler",
    "f150": "Joseph Perri",
    "focus": "Michael Stagnaro",
    "maxima": "Robert Berman",
    "miata": "Jack Walz",
    "mazda 3": ["Matt Fishman", "Everett Johnson"],
    "rogue": "Josh White",
    "tahoe": "Cameron Pepe",
    "v50": "Robert Edstrom"
}

module.exports = {
    respond: function (message) {
        var response = processMessage(message.toLowerCase());

        var options = {
            method: 'POST',
            url: "https://api.groupme.com/v3/bots/post",
            data: { "text" : response, "bot_id" : "4985f806e5462413b4cd75b06e" }
        }

        curl.request(options, function(error, response) {
            if (error) {
                console.log(error);
            }
        });
    }
}

// Checks if @whosecar tag is in message. If so, calls getOwner and returns
// proper response
function processMessage(message) {
    if (message.indexOf("@whosecar") != -1) {
        var response = "WHOSECAR:\n\n"
        if (message.length - 9 <= 1) {
            return response + "Include a car brand or make!"
        } else if (message.indexOf("josh") != -1) {
            return "fuck you josh";
        } else {
            return response + getOwner(message);
        }
    } else if (message.indexOf("@insult") != -1) {
        var i = Math.floor(Math.random() * insultCompliment.Insults.length);
        var insult = insultCompliment.Insults[i];
        if (message.length - 6 <= 1) {
            return insult;
        } else {
            return message.split(7, message.length) + ": " + insult;
        }
    } else if (message.indexOf("@compliment") != -1) {
        var i = Math.floor(Math.random() * insultCompliment.Compliments.length);
        var compliment = insultCompliment.Compliments[i];
        if (message.length - 10 <= 1) {
            return compliment;
        } else {
            return message.split(11, message.length) + ": " + compliment;
        }
    } else if (message.indexOf("pebs") != -1) {
        return "Pebs? heck ya dood lets get stoney baloney";
    }
}

// Determines proper owner or owners of a car make/brand. If the relevant make
// or brand do not exist in the back lot, return a "BOOT" message.
function getOwner(message) {
    var string = message.split(" ");
    var name, brand, make;

    // Parses through string and sets relevant variables
    string.forEach(function(word) {
            // If the word matches a make of car that exists in the back lot,
            // Set the relevant variable. If there are multiple owners of the
            // same make of car, make a list of owners
            if (makes.hasOwnProperty(word)) {
                var owner = makes[word];
                make = word;
                name = "";

                if (owner instanceof Array) {
                  owner.forEach(function(str) {
                    name += str + "\n";
                  });
                } else {
                  name = owner;
                }
            }

            // If the word matches a brand of car that exists in the back lot,
            // set the relevant variable to it
            if (brands.hasOwnProperty(word)) {
                brand = word;
            }
    });

    if (typeof name != 'undefined') {
        return name;
    } else if (typeof brand != 'undefined') {
        var owners = "";

        brands[brand].forEach(function(make) {
            if (makes[make] instanceof Array) {
              makes[make].forEach(function(str){
                owners += str + "\n";
              });
            } else {
              owners += makes[make] + "\n";
            }
        });
        return "Owners of a " + brand + ":\n" + owners;
    } else {
        return "No one with that car! BOOT";
    }
}
