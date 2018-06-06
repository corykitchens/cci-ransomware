# CCI-Ransomware Game

### Requirements
- NodeJS version >= 8 LTS
- NPM
- Yarn
- PostgreSQL


### Installation

1. Clone the respository and cd into the directory
```sh
$ https://github.com/corykitchens/cci-ransomware.git && cd cci-ransomware/
```

2. Install the dependencies in both server/client directory
```sh
cci-ransomware $] npm install
cci-ransomware $] cd client/
cci-ransomware $] npm install
```
3. Create your .ENV file containing the following environment variables
```sh
touch .env
```
```sh
PORT=80 for prod, anything else for dev
PGHOST='localhost'
PGUSER=`yourusername`
PGDATABASE=`yourdatabasename`
PGPASSWORD=`yourpassword`
PGPORT=5432
```
4. Create the tables and initial data for the database
Run the schema.sql against the database to create the tables/initial data

5. Install Yarn globally to run scripts
```sh
cci-ransomware $] npm install -g yarn
````

### TODO
- create-react-app build
- Use nginx to proxy port 80 requests to port 5000/NodeJS?
- Express to serve client/index.html with build version