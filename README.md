# CCI-Ransomware Game

### Requirements

- NodeJS version >= 8 LTS && NPM (https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)
- Yarn (via npm install -g yarn)
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
client $] npm install
```

3. Run Yarn build to ready the client-side code for production

```sh
client $] yarn build
```

3. Change back to the project root directory. And create your .ENV file containing the following environment variables
   (Note this could also be done with Parameter Store)

```sh
cci-ransomware $] touch .env
```

4. Example .ENV file

```sh
PGHOST=yourpghostname or localhost
PGUSER=`yourusername`
PGDATABASE=`yourdatabasename`
PGPASSWORD=`yourpassword`
PGPORT=5432
```

5. Execute the `db/schema.sql` to build the tables and initial mock data.
   Execute via `pgAdmin` or via pg shell

6. Run the server

```sh
cci-ransomware $] npm start
```
