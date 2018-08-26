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

    var tableData; 

    connection.query("SELECT * from products", function(error, data) {
        if (error){
            return console.error(error.message);        
        }

        function exit() {
            connection.end();
            process.exit(0);
        }

        tableData = data;
        console.table(tableData);


        //console.log("<------------------------------------------------>");

        inquirer
        .prompt([
        {
            name: "pickAnItem",
            type: "rawList",
            
            message: "What is the product ID of the item you would like to purchase? (or q for quit)"

        },
        {
            name: "howMany",
            type: "input",
            message: "How many units would you like to purchase?"
        }])
        .then(function(answer) {
            
            if(answer.pickAnItem === 'q' || answer.howMany === 'q') {
                exit();
            }

            // var chosenItem;
            console.log(answer.pickAnItem);
            console.log(answer.howMany);
            var howMany = parseInt(answer.howMany);
            var pickAnItem = parseInt(answer.pickAnItem);
            for (var i = 0; i < tableData.length; i++) {
                
                if (pickAnItem === tableData[i].id) {
                    if (howMany > tableData[i].stock_quantity) {
                        console.log("Insufficient Quanity!!!" );
                        // start();
                        break;
                    } else {
                        purchaseItem(pickAnItem, tableData[i].stock_quantity - howMany);
                        console.log("Your total is: $" + howMany * tableData[i].price);    
                        break;
                    } // quanity check
                } else {
                    console.log("INVALID SELECTION");
                }// id match
            } // for loop
            
        }); // this is end of inquirer
    }); // this is end of select
} // function

function purchaseItem(pickAnItem, difference) {

    var sql = "UPDATE products SET ? WHERE ?";
    var replacements = [
        {
            stock_quantity: difference
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



