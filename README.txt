This application provides deals to the customers in real time. Those deals are uploaded by the companies/advertisers via the website form interface. Customers can also get deal analytics features like most popular deals etc.

The technologies used are Node, Express for the backend. MongoDb for the DataBase and Angular for the frontend.

In progress additions to the website:
	1. API interface for the advertisers to push the deals programmatically to the database.
	2. social interaction features like comments for the customers.
	3. Custom notifications for the customers.

How to Run
===========
1. npm install -i in both BackEnd\DealSite and FrontEnd\DealSite folders to install all the dependencies.
2. run local mongodb server in cmd with command:
	mongod --dbpath=BackEnd\mongodb\dataBase
3. navigate to BackEnd\DealSite and run the command: nodemon index
4. navigate to FronEnd\DealSite and run the command: ng serve --o for the angular CLI server to run on port 4200.
 