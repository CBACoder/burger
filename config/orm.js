var connection = require("./connection.js");

// helper function
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

//create an object to handle our sql statements
var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, [tableInput], function (err, result) {
            if (err) throw err;
            console.log(result);
            cb(result);
        });
    },

    insertOne: function (table, colList, valList, cb) {
        var queryString = "INSERT INTO " + table + "(" + colList.toString() + ")" + " VALUES ( " + printQuestionMarks(valList.length) + ");"
        console.log(queryString);
        connection.query(queryString, valList, function (err, result) {
            if (err) throw err;
            console.log(result);
            cb(result);
        });
    },

    updateOne: function (table, colToUpdate, condition, cb) {
        console.log(colToUpdate);
        var queryString =
            "UPDATE " + table + ' SET ' + objToSql(colToUpdate) + " WHERE " + condition + ";";
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            console.log(result);
            cb(result);
        }
        );
    }
};


module.exports = orm;