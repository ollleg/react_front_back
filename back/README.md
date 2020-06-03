# Smog-Free-Api

Api for smog-free mobile app and website

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Smog-Free-Api dependencies.

```bash
npm install
```

Then to start server do:
```bash
npm start
```

## Documentation

### API USER - CreateUser V1
User signup endpoint.

**Endpoint:**

```http
POST /api/v1/user/signup HTTP/1.1
Content-Type: application/json; charset=utf-8
```

Test command: 
```bash
curl -d '{"email":"valid@email.format", "password":"Test_PWD1", "birth_date": "1980-02-04", "gender": "male"}' -H "Content-Type: application/json" -X POST http://localhost:4000/api/v1/user/signup
```

**Request body:**

```json
{
  "email": "valid@email.format", mandatory
  "password": "Test_PWD1", mandatory
  "first_name": "Name",
  "last_name": "Surname",
  "birth_date": "1980-02-04", mandatory
  "gender": "male" mandatory
}
```


**Responses:** 

200 - OK: 

```json
{
  "status": "ok",
  "data": {
      "uuid": "110e8400-e29b-11d4-a716-446655440000",
      "session": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
}
```

400 - Invalid email format: 

```json
{
  "status": "error",
  "error_code": "invalid_email_format"
}
```

400 - Under 18 years old: 

```json
{
  "status": "error",
  "error_code": "under_18yo"
}
```

400 - Insecure password. Password must have at least 8 characters, must include at least ONE digit and ONE special symbols like @$^&*({[}])_ and etc.: 

```json
{
  "status": "error",
  "error_code": "insecure_password"
}
```

400 - Unfilled mandatory fields: 

```json
{
  "status": "error",
  "error_code": "mandatory_field_empty"
}
```

400 - Invalid gender type. Possible values ['male', 'female']: 

```json
{
  "status": "error",
  "error_code": "invalid_gender"
}
```

400 - Invalid time format. Possible values ['12_hours', '24_hours']: 

```json
{
  "status": "error",
  "error_code": "invalid_time_format"
}
```

400 - Invalid date format. Valid format is "YYYY-MM-DD":

```json
{
  "status": "error",
  "error_code": "invalid_date"
}
```

400 - User with such email already exist:

```json
{
  "status": "error",
  "error_code": "already_exists"
}
```

***

### API USER - Login V1
User login endpoint.

**Endpoint:**

```http
POST /api/v1/user/login HTTP/1.1
Content-Type: application/json; charset=utf-8
```

Test command: 
```bash
curl -d '{"email":"valid@email.format", "password":"Test_PWD1"}' -H "Content-Type: application/json" -X POST http://localhost:4000/api/v1/user/login
```

**Request body:**

```json
{
  "email": "valid@email.format", mandatory
  "password": "Test_PWD1" mandatory
}
```


**Responses:** 

200 - OK: 

```json
{
  "status": "ok",
  "data": {
      "user": {
        "uuid": "110e8400-e29b-11d4-a716-446655440000",
        "email": "valid@email.format",
        "first_name": "Name",
        "last_name": "Surname",
        "birth_date": "1980-02-04",
        "country": "France",
        "gender": "male",
        "units": "metric",
        "currency": "eur"
      },
      "session": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
}
```

401 - Invalid email or password: 

```json
{
  "status": "error",
  "error_code": "invalid_credentials"
}
```

***
### API USER - GetUser V1
User info retrieve endpoint.

**Endpoint:**

```http
GET /api/v1/user HTTP/1.1
Content-Type: application/json; charset=utf-8
```

Test command: 
```bash
curl -XGET -H 'Authorization: <session token>' 'http://localhost:4000/api/v1/user'
```

**Request headers:**

| Header |Value  |
|--|--|
| Authorization |Session token  |


**Responses:** 

200 - OK: 

```json
{
  "status": "ok",
  "data": {
    "user": {
      "uuid": "110e8400-e29b-11d4-a716-446655440000",
      "email": "valid@email.format",
      "first_name": "Name",
      "last_name": "Surname",
      "birth_date": "1980-02-04",
      "country": "France",
      "gender": "male",
      "units": "metric",
      "currency": "eur"
    }
  }
}
```

401 - Invalid session token: 

```json
{
  "status": "error",
  "error_code": "invalid_session"
}
```

***

### API USER - ChangePassword V1
Change user password endpoint.

**Endpoint:**

```http
PUT /api/v1/user/password HTTP/1.1
Content-Type: application/json; charset=utf-8
```

Test command: 
```bash
curl -XPUT -H 'Authorization: <session token>' -H "Content-type: application/json" -d '{
  "password": "Test_PWD1"
}' 'http://localhost:4000/api/v1/user/password'
```

**Request headers:**

| Header |Value  |
|--|--|
| Authorization |Session token  |
  
  
**Request body:**

```json
{
  "password": "Test_PWD1" mandatory
}
```

**Responses:** 

200 - OK: 

```json
{
  "status": "ok"
}
```

401 - Invalid session token: 

```json
{
  "status": "error",
  "error_code": "invalid_session"
}
```

400 - Insecure password. Password must have at least 8 characters, must include at least ONE digit and ONE special symbols like @$^&*({[}])_ and etc.: 

```json
{
  "status": "error",
  "error_code": "insecure_password"
}
```

400 - Unfilled mandatory fields: 

```json
{
  "status": "error",
  "error_code": "mandatory_field_empty"
}
```

***

### API USER - SaveUser V1
User update endpoint.

**Endpoint:**

```http
PUT /api/v1/user HTTP/1.1
Content-Type: application/json; charset=utf-8
```

Test command: 
```bash
curl -XPUT -H 'Authorization: <session token>' -H "Content-type: application/json" -d '{
  "email": "valid@email.format", 
  "first_name": "Name",
  "last_name": "Surname",
  "birth_date": "1980-02-04",
  "gender": "male",
  "currency": "EUR",
  "units": "metric",
  "country": "FR"
}' 'http://localhost:4000/api/v1/user'
```

**Request headers:**

| Header |Value  |
|--|--|
| Authorization |Session token  |

**Request body:**

```json
{
  "email": "valid@email.format", mandatory
  "first_name": "Name",
  "last_name": "Surname",
  "birth_date": "1980-02-04", mandatory
  "gender": "male", mandatory
  "currency": "EUR", mandatory
  "units": "metric", mandatory
  "country": "FR"
}
```


**Responses:** 

200 - OK: 

```json
{
  "status": "ok"
}
```

400 - Invalid email format: 

```json
{
  "status": "error",
  "error_code": "invalid_email_format"
}
```

400 - Under 18 years old: 

```json
{
  "status": "error",
  "error_code": "under_18yo"
}
```

400 - Insecure password. Password must have at least 8 characters, must include at least ONE digit and ONE special symbols like @$^&*({[}])_ and etc.: 

```json
{
  "status": "error",
  "error_code": "insecure_password"
}
```

400 - Unfilled mandatory fields: 

```json
{
  "status": "error",
  "error_code": "mandatory_field_empty"
}
```

400 - Invalid gender type. Possible values ['male', 'female']: 

```json
{
  "status": "error",
  "error_code": "invalid_gender"
}
```

400 - Invalid currency: 

```json
{
  "status": "error",
  "error_code": "invalid_currency"
}
```

400 - Invalid country code: 

```json
{
  "status": "error",
  "error_code": "invalid_country"
}
```

400 - Invalid units. Possible values ['metric', 'imperial', 'us']: 

```json
{
  "status": "error",
  "error_code": "invalid_units"
}
```

400 - Invalid date format. Valid format is "YYYY-MM-DD":

```json
{
  "status": "error",
  "error_code": "invalid_date"
}
```

400 - User with such email already exist:

```json
{
  "status": "error",
  "error_code": "already_exists"
}
```

***


### API CIGARETTE - SaveCigarette V1
Cigarette save endpoint.

**Endpoint:**

```http
PUT /api/v1/cigarette HTTP/1.1
Content-Type: application/json; charset=utf-8
```

Test command: 
```bash
curl -XPUT -H 'Authorization: <session token>' -H "Content-type: application/json" -d '{
  "ean_code": "3401312345624",
  "brand_name": "Bond",
  "subrand_name": "Red",
  "manufacturer": "Bond inc.",
  "quantity": 25,
  "price": 5.5,
  "currency": "EUR",
  "nicotine_mg": 10,
  "tar_mg": 20,
  "carbon_mg": 30
}' 'http://localhost:4000/api/v1/cigarette'
```

**Request headers:**

| Header |Value  |
|--|--|
| Authorization |Session token  |

**Request body:**

```json
{
  "ean_code": "3401312345624", mandatory
  "brand_name": "Bond", mandatory
  "subrand_name": "Red", mandatory
  "manufacturer": "Bond inc.",
  "size": "king", mandatory
  "quantity": 25, mandatory
  "price": 5.5, mandatory
  "currency": "EUR", mandatory
  "nicotine_mg": 10,
  "tar_mg": 20,
  "carbon_mg": 30
}
```


**Responses:** 

200 - OK: 

```json
{
  "status": "ok",
  "data": {
      "uuid": "110e8400-e29b-11d4-a716-446655440000"
  }
}
```

401 - Invalid session token: 

```json
{
  "status": "error",
  "error_code": "invalid_session"
}
```

400 - Unfilled mandatory fields: 

```json
{
  "status": "error",
  "error_code": "mandatory_field_empty"
}
```

400 - Invalid EAN code: supported formats EAN-13, EAN-8, UPC-A, and UPC-E

```json
{
  "status": "error",
  "error_code": "invalid_ean_code"
}
```

400 - Invalid brand: max 50 chars

```json
{
  "status": "error",
  "error_code": "invalid_brand_name"
}
```

400 - Invalid subrand: max 50 chars

```json
{
  "status": "error",
  "error_code": "invalid_subrand_name"
}
```

400 - Invalid manufacturer: max 50 chars

```json
{
  "status": "error",
  "error_code": "invalid_manufacturer"
}
```

400 - Invalid currency: 

```json
{
  "status": "error",
  "error_code": "invalid_currency"
}
```

400 - Invalid size: Valid values = ["regular","king","slim","super_slim","100s","200s"]

```json
{
  "status": "error",
  "error_code": "invalid_size"
}
```

400 - Already exist: cigarette with such EAN code already exist

```json
{
  "status": "error",
  "error_code": "already_exists"
}
```

400 - Invalid quantity: min=1, max=99

```json
{
  "status": "error",
  "error_code": "invalid_quantity"
}
```

400 - Invalid price: must be a number

```json
{
  "status": "error",
  "error_code": "invalid_price"
}
```

400 - Invalid nicotine_mg: 
Number format is invalid. Must be >= 0, max value 5 mg

```json
{
  "status": "error",
  "error_code": "invalid_nicotine"
}
```

400 - Invalid tar_mg: 
Number format is invalid. Must be >= 0, max value 50 mg

```json
{
  "status": "error",
  "error_code": "invalid_tar"
}
```

400 - Invalid carbon_mg: 
Number format is invalid. Must be >= 0, max value 50 mg

```json
{
  "status": "error",
  "error_code": "invalid_carbon"
}
```


***
### API CIGARETTE - SearchCigarette V1
Search cigarette by EAN code.

**Endpoint:**

```http
GET /api/v1/cigarette?ean_code=3401312345624 HTTP/1.1
Content-Type: application/json; charset=utf-8
```

Test command: 
```bash
curl -XGET -H 'Authorization: <session token>' 'http://localhost:4000/api/v1/cigarette?ean_code=3401312345624'
```

**Request headers:**

| Header |Value  |
|--|--|
| Authorization |Session token  |


**Responses:** 

200 - OK: 

```json
{
  "status": "ok",
  "data": {
    "cigarette": {
      "ean_code": "3401312345624", 
      "brand_name": "Bond", 
      "subrand_name": "Red", 
      "manufacturer": "Bond inc.",
      "size": "king", 
      "quantity": 25, 
      "price": 5.5, 
      "currency": "EUR", 
      "nicotine_mg": 10,
      "tar_mg": 20,
      "carbon_mg": 30
    }
  }
}
```

401 - Invalid session token: 

```json
{
  "status": "error",
  "error_code": "invalid_session"
}
```

400 - Unfilled ean_code: 

```json
{
  "status": "error",
  "error_code": "mandatory_field_empty"
}
```

404 - Cigarette not exist by given EAN code: 

```json
{
  "status": "error",
  "error_code": "not_found"
}
```

***
### API MOTIVATION - ListMotivations V1
Retreive all motivations list sorted by create date.

**Endpoint:**

```http
GET /api/v1/motivation HTTP/1.1
Content-Type: application/json; charset=utf-8
```

Test command: 
```bash
curl -XGET -H 'Authorization: <session token>' 'http://localhost:4000/api/v1/motivation'
```

**Request headers:**

| Header |Value  |
|--|--|
| Authorization |Session token  |


**Responses:** 

200 - OK: 

```json
{
  "status": "ok",
  "data": {
    [
      {
        "uuid": "",
        "title": "Motivation title 1",
        "message": "Motivation message 1",
        "image_url": "http://motivation.image/test1.png"
      },
      {
        "uuid": "",
        "title": "Motivation title 2",
        "message": "Motivation message 2",
        "image_url": "http://motivation.image/test2.png"
      }
    ]
  }
}
```

401 - Invalid session token: 

```json
{
  "status": "error",
  "error_code": "invalid_session"
}
```
***


### API LOG - SaveLog V1
Log save endpoint.

**Endpoint:**

```http
PUT /api/v1/log HTTP/1.1
Content-Type: application/json; charset=utf-8
```

Test command: 
```bash
curl -XPUT -H 'Authorization: <session token>' -H "Content-type: application/json" -d '{
  "date": "2019-02-02T12:23:22.223", 
  "level": "info",
  "message": "Log message"
}' 'http://localhost:4000/api/v1/log'
```

**Request headers:**

| Header |Value  |
|--|--|
| Authorization |Session token  |

**Request body:**

```json
{
  "date": "2019-02-02T12:23:22.223", mandatory
  "level": "info", mandatory
  "message": "Log message" mandatory
}
```


**Responses:** 

200 - OK: 

```json
{
  "status": "ok",
  "data": {
      "uuid": "110e8400-e29b-11d4-a716-446655440000"
  }
}
```

400 - Invalid date format: supported format YYYY-MM-DDTHH:mm:ss.SSS

```json
{
  "status": "error",
  "error_code": "invalid_date"
}
```

400 - Invalid level: possible values ['info', 'warning', 'error', 'verbose']

```json
{
  "status": "error",
  "error_code": "invalid_level"
}
```

400 - Mandatory fields not filled

```json
{
  "status": "error",
  "error_code": "mandatory_field_empty"
}
```

400 - Invalid session: 

```json
{
  "status": "error",
  "error_code": "invalid_session"
}
```

***


### API REFILL - SaveRefill V1
User cigarette refill save endpoint.

**Endpoint:**

```http
PUT /api/v1/refill HTTP/1.1
Content-Type: application/json; charset=utf-8
```

Test command: 
```bash
curl -XPUT -H 'Authorization: <session token>' -H "Content-type: application/json" -d '{
  "cigarette_uuid": "110e8400-e29b-11d4-a716-446655440000",
  "date": "2019-02-02T12:23",
  "quantity": 25,
  "price": 5.5,
  "currency": "EUR"
}' 'http://localhost:4000/api/v1/refill'
```

**Request headers:**

| Header |Value  |
|--|--|
| Authorization |Session token  |

**Request body:**

```json
{
  "cigarette_uuid": "110e8400-e29b-11d4-a716-446655440000", mandatory
  "date": "2019-02-02T12:23", mandatory
  "quantity": 25, mandatory
  "price": 5.5, mandatory
  "currency": "EUR" mandatory
}
```


**Responses:** 

200 - OK: 

```json
{
  "status": "ok",
  "data": {
      "uuid": "110e8400-e29b-11d4-a716-446655440000"
  }
}
```

404 - Cigarette not exist: provided cigarette uuid not found

```json
{
  "status": "error",
  "error_code": "not_found"
}
```

400 - Invalid date:

```json
{
  "status": "error",
  "error_code": "invalid_date"
}
```

400 - Invalid currency: 

```json
{
  "status": "error",
  "error_code": "invalid_currency"
}
```

400 - Invalid quantity: min=1, max=99

```json
{
  "status": "error",
  "error_code": "invalid_quantity"
}
```

400 - Invalid price: must be a number

```json
{
  "status": "error",
  "error_code": "invalid_price"
}
```

400 - Mandatory fields not filled

```json
{
  "status": "error",
  "error_code": "mandatory_field_empty"
}
```

401 - Invalid session token: 

```json
{
  "status": "error",
  "error_code": "invalid_session"
}
```

***
### API REFILL - ListRefills V1
Retreive all refills sorted by refill date.

**Endpoint:**

```http
GET /api/v1/refill HTTP/1.1
Content-Type: application/json; charset=utf-8
```

Test command: 
```bash
curl -XGET -H 'Authorization: <session token>' 'http://localhost:4000/api/v1/refill'
```

**Request headers:**

| Header |Value  |
|--|--|
| Authorization |Session token  |


**Responses:** 

200 - OK: 

```json
{
  "status": "ok",
  "data": {
    "cigarettes": [
      {
        "uuid": "110e8400-e29b-11d4-a716-446655440000",
        "ean_code": "123456",
        "brand_name": "Bond",
        "subrand_name": "Red",
        "manufacturer": "Bond inc.",
        "quantity": 25,
        "price": 5.5,
        "currency": "EUR",
        "nicotine_mg": 10,
        "tar_mg": 20,
        "carbon_mg": 30
      }
    ],
    "refills": [
      {
        "cigarette": {
          "uuid": "110e8400-e29b-11d4-a716-446655440000",
          "ean_code": "123456",
          "brand_name": "Bond",
          "subrand_name": "Red",
          "manufacturer": "Bond inc.",
          "quantity": 25,
          "price": 5.5,
          "currency": "EUR",
          "nicotine_mg": 10,
          "tar_mg": 20,
          "carbon_mg": 30
        },
        "refill": {
          "uuid": "110e8400-e29b-11d4-a716-446655440001",
          "cigarette_uuid": "110e8400-e29b-11d4-a716-446655440000",
          "date": "2019-02-02T12:23",
          "quantity": 25,
          "price": 5.5,
          "currency": "EUR"
        }
      },
      {
        "cigarette": {
          "uuid": "110e8400-e29b-11d4-a716-446655440000",
          "ean_code": "123456",
          "brand_name": "Bond",
          "subrand_name": "Red",
          "manufacturer": "Bond inc.",
          "quantity": 25,
          "price": 5.5,
          "currency": "EUR",
          "nicotine_mg": 10,
          "tar_mg": 20,
          "carbon_mg": 30
        },
        "refill": {
          "uuid": "110e8400-e29b-11d4-a716-446655440002",
          "cigarette_uuid": "110e8400-e29b-11d4-a716-446655440000",
          "date": "2019-02-02T12:23",
          "quantity": 25,
          "price": 5.5,
          "currency": "EUR"
        }
      }
    ]
  }
}
```

401 - Invalid session token: 

```json
{
  "status": "error",
  "error_code": "invalid_session"
}
```