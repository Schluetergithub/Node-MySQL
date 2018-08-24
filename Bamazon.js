var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {

    connection.query("SELECT * from products", function(error, data) {
        if (error){
            return console.error(error.message);
        }
    
        //console.table(data);

        //console.log("<------------------------------------------------>");

        inquirer
        .prompt(
        {
            name: "pickAnItem",
            type: "input",
            message: "What is the product ID of the item you would like to purchase? (or q for quit)"
        },
        {
            name: "howMany",
            type: "input",
            message: "How many units would you like to purchase?"
        })
        .then(function(answer) {
            /*
            if(answer.pickAnItem === 'q') {
                connection.end();
                process.exit(0);
            }
            for (var i = 0; i > data.length; i++) {
                if (answer.pickAnItem === data[i].id) {
                    if(answer.howMany > data[i].stock_quanity) {
                        console.log("Insufficient Quanity!!!");
                        start();
                    } else {
                        purchaseItem(answer.pickAnItem, data[i].stock_quanity - answer.howMany);    
                    } // quanity check
                } // id match
            } // for loop
            */
        }); // this is end of inquirer
    }); // this is end of select
} // function

function purchaseItem(pickAnItem, difference) {

    var sql = "UPDATE products SET ? WHERE ?";
    var replacements = [
        {
            stock_quanity: difference
        },
        {
            id: pickAnItem
        },
    ];
    
    connection.query(sql, replacements, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        start();
    });
}



