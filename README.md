# map-places

## Prerequisites

* Node.js (tested on v6.10.3)
* npm
* MySQL

## Install

```
* create a new MySQL database and change config.json development configurations to match the database details
```

```
> npm install restify restify-validator sequelize sequelize-cli mysql mysql2 -g
```

```
> npm install
```

```
> sequelize db:migrate
```

```
> sequelize db:seed:all
```

## Running

```
> node app.js
```

```
* open browser and go to: http://localhost:3000/
```