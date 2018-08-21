var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require('console.table');

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
    console.table([
        {
          ID: 1,
          item_name: 'action_figure',
          dept: 'toys',
          price: 5,
          stock_quantity: 20
        },
        {
            ID: 2,
            item_name: 'bicycle',
            dept: 'sports',
            price: 100,
            stock_quantity: 5
          },
          {
            ID: 3,
            item_name: 'baseball_bat',
            dept: 'sports',
            price: 20,
            stock_quantity: 10
          },
          {
            ID: 4,
            item_name: 'scooter',
            dept: 'sports',
            price: 50,
            stock_quantity: 10
          },
          {
            ID: 5,
            item_name: 'puzzle',
            dept: 'games',
            price: 7,
            stock_quantity: 20
          },
          {
            ID: 6,
            item_name: 'drone',
            dept: 'electronics',
            price: 300,
            stock_quantity: 2
          },
          {
            ID: 7,
            item_name: 'tent',
            dept: 'outdoors',
            price: 75,
            stock_quantity: 5
          },
          {
            ID: 8,
            item_name: 'fishing_pool',
            dept: 'outdoors',
            price: 100,
            stock_quantity: 3
          },
          {
            ID: 9,
            item_name: 'blender',
            dept: 'kitchen',
            price: 70,
            stock_quantity: 3
          },
          {
            ID: 10,
            item_name: 'slinky',
            dept: 'toys',
            price: 2,
            stock_quantity: 20
          }
      ]);

  inquirer
    .prompt({
      name: "pickAnItem",
      type: "rawlist",
      message: "Which product would you like to purchase?",
      choices: ["action_figure", "bicycle", "baseball_bat", "scooter", "puzzle", "drone", "tent", "fishing_pole", "blender", "slinky"]
    })
    .then(function(answer) {
        inquirer
        .prompt({
            name: "howMany",
            type: "input",
            message: "How many units would you like to purchase?"
        })
        // need help figuring how to compare order to stock number
      if (answer.howMany > answer.pickAnItem) {
        purchaseItem();
      }
      else {
        outOfStock();
      }
    });
}

function purchaseItem() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item you would like to submit?"
      },
      {
        name: "category",
        type: "input",
        message: "What category would you like to place your auction in?"
      },
      {
        name: "startingBid",
        type: "input",
        message: "What would you like your starting bid to be?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO auctions SET ?",
        {
          item_name: answer.item,
          category: answer.category,
          starting_bid: answer.startingBid,
          highest_bid: answer.startingBid
        },
        function(err) {
          if (err) throw err;
          console.log("Your auction was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function outOfStock() {
    console.log("Insufficient Quantity!");
    start();





//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function(err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What auction would you like to place a bid in?"
//         },
//         {
//           name: "bid",
//           type: "input",
//           message: "How much would you like to bid?"
//         }
//       ])
//       .then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         // determine if bid was high enough
//         if (chosenItem.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE auctions SET ? WHERE ?",
//             [
//               {
//                 highest_bid: answer.bid
//               },
//               {
//                 id: chosenItem.id
//               }
//             ],
//             function(error) {
//               if (error) throw err;
//               console.log("Bid placed successfully!");
//               start();
//             }
//           );
//         }
//         else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
}

