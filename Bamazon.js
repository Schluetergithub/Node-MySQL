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
    
        console.table(data);



        console.log("<------------------------------------------------>");

        inquirer
        .prompt({
            name: "pickAnItem",
            type: "input",
            message: "What is the product ID of the item you would like to purchase?",
        },{
            name: "howMany",
            type: "input",
            message: "How many units would you like to purchase?"
        })
        .then(function(answer) {
            
            for (i = 0; i > answers.length; i++) {
                
                if (answer.pickAnItem === ) {
                    purchaseItem();
                }
                else {
                    outOfStock();
                }
            }
            // need help figuring how to compare order to stock number
            
        }); // this is end of inquirer

    }); // this is end of select
  
}

function purchaseItem() {
    connection.connect(function(err) {
        if (err) throw err;
        var sql = "UPDATE  SET address = 'Canyon 123' WHERE address = 'Valley 345'";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
        });
      });

        // update statment
    let sql = `UPDATE todos
    SET completed = ?
    WHERE id = ?`;

    let data = [false, 1];

    // execute the UPDATE statement
    connection.query(sql, data, (error, results, fields) => {
    if (error){
    return console.error(error.message);
    }
    console.log('Rows affected:', results.affectedRows);
    });
}

function outOfStock() {
    console.log("Insufficient Quantity!");
    start();
}

// make an exit to run this code
// connection.end();