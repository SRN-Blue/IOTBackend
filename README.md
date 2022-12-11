# **IOT Backend Infrastructure**  
This is a Backend project which is designed to support all the required features to gather live datas from sensors and IOT Gateways, authenticate them and finally store them in database. different parts have been built with microservice mindset so the project is scaleable for enterprise usage and can be modefied to fit the desired architecture.  
  
## **Technologies Used in Project**  
* **Node.js**
* **Express.js**
* **Socket.io**
* **Docker**
* **Nginx**
* **MySQL**
* **MongoDB**
* **Mocha**
* **Chai**  

# **Getting Started**  
since the project is using Docker, the images contain all required libraries and dependencies and you just need to have Docker installed, however if you want to run each part seperately or outside docker, you need to make sure these items are installed on your machine:  

1. Node.js
2. Docker
3. MySQL
4. MongoDB
  
PN: it is ok to host the DataBases on a cloud, however make sure to change URL in server configurations so they can connect to them.
  
  
# **How to Run the Code**  
* Step One: Clone this repo to your desktop and open a terminal(CMD in windows).  
    * All folders except for the reverse proxy have a Dockerfile
* Step Two: Find the Dockerfile and run `docker build .`
    * Do this step for all the Dockerfile`s in the project
    * You can run `docker build -t` to give a name
    * Make sure you are in the same directory as the Dockerfile  
* Step Three: locate to root of the project and run `docker-compose build`
* Step Three: finally run `docker-compose up`
    * while in docker servers wait for the database services to start, they dont wait them to be responsive, so they might restart in the
    beginning of the command and face some errors, however after some time the all get ok and can communicate without problem
    when its been run for the first time(usually happens)
* The project have some automated test, in order to run them use `npm test` command
    *  right now only Authentication server has automated tests(it uses another database for testing and wont change actual DataBase)(make sure to locate to its directory)

# **How the Project Can be Used**  

while all services are on default network on Docker and are accessible individually(for testing perposes and not for production), the Nginx will act as a reverse proxy(LoadBalancing will be handled by docker(Using Replicas and docker Swarm)) and route all your request to the destination server.  
All the communications are done in JSON format, so posting data to server and getting a response would all be done in a JSON format.
we use JWT Token for Authentication/Authurization in the whole project.(keep in mind that these tokens have expire date and need to be regenrated, so if leaked it wouldn`t be a big deal)

## **General WorkFLow of the Project**  
* first a user needs to be created in the SQL database.
> this can be done through /user/signup  
you need to include Json Body that contains name, email, password  
* then you can get the generate and get the token for Auth/Auth
> you need to include Json Body that contains email, password   
* The next step is to use that token in your IOT Device or GateWay and pass data to servers and it will be stored in MongoDB
> you need to include Json Body that contains location, sensorType and Beare Token in header
there is IOTDevice server in this project to replicate the behavior of the real IOT Device.
**the connection of the 'live data collection server' and 'IOT Device' is established via socket** so whenever new data is published, it would be recieved by the server and authentivated via the token, then if is valid, would be stored in MongoDB

