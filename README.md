A E-commerce api built using Node.js, Express and ORM (sequelizejs ) using MYSQL driver. 
# Features
* [x] **temListings** - listing of the store items indicating price, name, and description for each item. Api must accept paging , max items per page as a parameters. 
```
 http://localhost:1337/api/v1/items?page=1&perPage=10

GET /api/v1/items?page=1&perPage=10
Host: localhost:1337
```
* [x] **insertItem**  - The user can select any quantity of various items to place in the cart.
```
POST /api/v1/items/:itemId/cart
Host: localhost:1337
Content-Type: application/json
{
    customerId: 1,
    quantity: 5
}
```
* [x] **removeItem**  - The user can remove items from his cart .
```
DELETE /api/v1/items/:itemId/cart
Host: localhost:1337
Content-Type: application/json
{
    customerId: 1
}
```
* [x] **editCart**    -  edit quantity of any of cart items. Or inserting new items in cart
```
PUT /api/v1/items/:itemId/cart
Host: localhost:1337
Content-Type: application/json
{
  customerId: 1,
   quantity: 6,
}
u can also put id of cart model to just update the quantity , if id not exist will insert new item.
then will be 
{
   customerId: 1,
   quantity: 6,
   id: 1
}
```
* [x] **getCartDetails** -   returns summary of the items he/she previously selected  along with quantity also total price of selected items
```
GET /api/v1/carts?customerId=1
Host: localhost:1337
```
* [x] **submitOrder** -  checkout the selected items in users cart and place an order. ,Accepting  address and telephone number as required parameters, if the user places the transaction, his/her store credits should be updated in the database and the transaction information should be saved in the Order table. Returning new user credit after the order in case of success or failed message in case of failure.
```
POST /api/v1/customers/:customerId/orders
Host: localhost:1337
Content-Type: application/json
{
    telephone: '012...',
    address: "address"
} 
```
* [x] **customerOrderHistory** - take customer id as parameter and returns all orders of this customer. Must accept paging and max items per page as a parameter.
```
GET /customers/:customerId/orders
Host: localhost:1337
```

> # Installation steps:
There are two ways to run the project
- using docker / docker-compose.
- using traditional way.

**1- using docker**
* make sure you have docker and docker compose installed in your computer, and working , can test by running those two commands.
```
$ docker -v
$ docker-compose -v
``` 
* Clone or Download the repository.
* Open your terminal and navigate to the project directory.
* Write in terminal
```
docker-compose up
```
this will (download and build) mysql image from docker hub if mysql version used not already exist in your computer, build api image and their containers then run database migrations and seeds

* Then api server will be running just open **postman** to request endpoints.
* Use workbench to open database  with this credentials

```
host: localhost || 127.0.0.1
post: 5000
username: root
password: 123456
```


**2- using traditional way**
* Clone or Download the repository.
* Use workbench to create new database , it`s name is **task**.
* open your terminal and navigate to the project directory.
* write in terminal
```
npm install
npm install sequelize-cli -g
```
* Edit configuration file in config/database.json with your credentials.
* run migrations to create tables in database.
```
* sequelize db:migrate
```
* run seeds to insert new user in database to be used in the system.
```
* sequelize db:seed:all
```
* Start the application
```
* npm start
```
Your app should now be running on localhost:1337.