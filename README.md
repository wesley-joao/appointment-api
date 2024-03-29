# appointment-api
 
# Github repository
# https://github.com/JoaoWesley/appointment-api.git

## How to run
 - To make it simple for execution .env file and firebase private key was commited
 - On the project root folder run `npm install` then `npm run dev`
 - Then the application will be available at: http://localhost:3001

### Linter
 - Run the command `npm run lint` to execute lint on the project

### Tests
  - Run the command `npm run test` to execute all the tests on the application.

# Dependencies
- NodeJS: JavaScript runtime
- Express: Web framework
- Body-parser: Receive request body 
- Moment: Date and time manipulation
- Moment-timezone: For working with timezones
- Nodemon: Hot reload
- DotEnv: Load environment variables
- FirebaseAdmin: Interact with firebase resources 
- Mocha: Test framework for javascript
- Chai: Assertion library


## Database

Database design was very simple, there is a event collection which holds all events documents with the following structure
````json  
    {
        "duration": 30,
        "startDateTime": "2020-01-01T13:00:00Z",
        "endDateTime": "2020-01-01T13:30:00Z"
    }    
````

Duration as the name suggest is how long the event lasts in minutes, startDateTime is the date and time of when the event will occur, endDateTime is when the event will end, both dates is saved in 
UTC so that we can convert it to whatever timezone is needed. Firestore already does a very good job at scaling resources as much as needed in a clever way, given the simple design we are working with I don't think further action is needed.

# API DOCUMENTATION

## Endpoint

  http://localhost:3001

## Requisições

### - Get events

This request return all events between two dates  

#### HTTP Method

    GET

#### URL

    /event/?startDate=2019-10-10&endDate=2020-11-02

#### Parameters

    {startDate} - Initial date
    {endDate} - Final date

The date provided can have offset following iso 8601 pattern if none is provided UTC will considered default.

#### Response

````json
  [
    {
        "startDateTime": "2020-02-01T16:00:00Z",
        "endDateTime": "2020-02-01T18:00:00Z",
        "duration": 120
    },
    {
        "endDateTime": "2020-02-01T19:00:00Z",
        "duration": 60,
        "startDateTime": "2020-02-01T18:00:00Z"
    }
  ]
````

### - Get free slots

Returns all free slots available for a given date

#### HTTP Method

    GET

#### URL

    /slot?timeZone=America/Sao_Paulo&date=2020-11-01

#### Parameters

    {timeZone} - Timezone for the given date
    {date} - Final date

The date can have offset following iso 8601 pattern if none is provided UTC will be considered default.

#### Response

````json
  [
    "2020-02-01 16:00",
    "2020-02-01 16:30",
    "2020-02-01 17:00",
    "2020-02-01 17:30",
    "2020-02-01 18:00",
    "2020-02-01 18:30",
    "2020-02-01 19:00",
    "2020-02-01 19:30",
    "2020-02-01 20:00",
    "2020-02-01 20:30",
    "2020-02-01 21:00",
    "2020-02-01 21:30",
    "2020-02-01 22:00"
  ]
````

### - Create event

This request creates a event 

#### HTTP Method
    POST

#### URL

    /event

#### Parameters

    {dateTime} - Date and time to create event, offset can be provided inside the string following the ISO 8601 format, otherwise UTC will be considered default.
    {duration} - How long the event will last.

This Parameter must be sent over as json in the request body, see below:

````json
  {
    "dateTime": "2020-02-01T20:30:00-03:00",
    "duration": 60
  }
````

#### Response

````json
  {
    "id": "oOHj7LGNfij2RUBH9c7E"
  }
````
