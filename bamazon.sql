DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  dept_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name,dept_name,price,stock_quantity)
VALUES('action_figure','toys',5,20),
      ('bicycle','sports',100,5),
      ('baseball_bat','sports',20,10),
      ('scooter','sports',50,10),
      ('puzzle','games',7,20),
      ('drone','electronics',300,2),
      ('tent','outdoors',70,5),
      ('fishing_pole','outdoors',100,3),
      ('blender','kitchen',70,3),
      ('slinky','toys',2,20);
      
