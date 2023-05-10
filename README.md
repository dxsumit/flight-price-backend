# flight-price-backend

REST API to get prices of different airlines running from source city to destination city on a particular day.<br>
MongoDB database has been used; API has been hosted on Render.com.<br>
Simple Authentication has been provided to authenticate the user.<br>
##### API - <a href="https://flight-api-40qk.onrender.com/api/v1/auth"> https://flight-api-40qk.onrender.com/api/v1/auth </a> <br>

#### Login [POST Method]
<a href="https://flight-api-40qk.onrender.com/api/v1/auth/login"> https://flight-api-40qk.onrender.com/api/v1/auth/login </a> 
<br>
Body to be passed 
```
  {
    "email": "admin@gmail.com",
    "password": "admin123"
  }
```

#### Create account Signup [POST Method]
<a href="https://flight-api-40qk.onrender.com/api/v1/auth/signup"> https://flight-api-40qk.onrender.com/api/v1/auth/signup </a> <br>
Body to be passed
```
  {
    “name”: “Full Name”,
    “age”: 34,
    "email": "admin@gmail.com",
    "password": "admin123"
  }
```
 

### Flight details
#### Get flight price [POST Method]
<a href="https://flight.ced19i028sumit.repl.co/api/v1/flight/get"> https://flight.ced19i028sumit.repl.co/api/v1/flight/get</a> <br>

Get all the prices of different airlines from source to destination on a particular date. If date is not passed, by default it will be current (today’s) date.<br>
Body to be passed.

```
  {
    "source": "mumbai",
    "destination": "varanasi",
    "date": "May 10, 2023"
  }
```

```
  {
    "source": "mumbai",
    "destination": "varanasi"
  }
```


#### Add new flight [POST Method]
<a href="https://flight.ced19i028sumit.repl.co/api/v1/flight/add"> https://flight.ced19i028sumit.repl.co/api/v1/flight/add</a> <br>

Add new flight of airline in the database. If date is not passed, by default it will be current (today’s) date. <br>
Body to be passed.

```
  {
    "source": "Prayagraj",
    "destination": "Chennai",
    "airline": "Indigo",
    "price": 2890,
    "date": "May 09, 2023"
  }
```

```
  {
    "source": "Prayagraj",
    "destination": "Chennai",
    "airline": "Indigo",
    "price": 2890
  }
```

Get all flights [GET Method]
<a href=”https://flight.ced19i028sumit.repl.co/api/v1/flight/all”> https://flight.ced19i028sumit.repl.co/api/v1/flight/all</a>

You can get all the flights from different airlines irrespective of date available in database.


Update Flight Details [PATCH Method]
<a href=”https://flight.ced19i028sumit.repl.co/api/v1/flight/update/:id”> https://flight.ced19i028sumit.repl.co/api/v1/flight/update/:id </a>

You can also update the flight details.
Unique ID of the flight must be passed as a parameter. Since it is a patch method can will contain only the fields that need to be updated.



```
	{
		"source": "mumbai",
   		"destination": "varanasi",
		“price”: 2611

	}
```


## Working ScreenShots

<center> 
  <div>
      <img src="https://github.com/dxsumit/flight-price-backend/assets/58907200/30764472-f2a4-4a8c-8854-a94942143d4b" width=40% height=40%>
      <img src="https://github.com/dxsumit/flight-price-backend/assets/58907200/64bc5c36-bc66-41ef-ae1a-5f788ff5954b" width=40% height=25%>
      <img src="https://github.com/dxsumit/flight-price-backend/assets/58907200/1c7187fa-0882-4c2b-8620-bc859311eed4" width=40% height=25%> 
      <img src="https://github.com/dxsumit/flight-price-backend/assets/58907200/bcbed613-ebd7-410f-9b9c-d200446b0550" width=40% height=40%>
  </div>

</center>

