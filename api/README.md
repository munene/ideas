# Ideas API

All API endpoints are prefixed with `v1` e.g. `localhost:8080/v1/news-articles`
The API exposes the following endpoints:

# news-articles

## Get all news articles
**Request:**
Uri: `/news-articles [GET]`

**Response:**
Http Code: 200
```
[
	{
		"id": "09991341-3cd4-434e-9619-5d11b3e8c992",
		"title": "Test6",
		"text": "text!!!!",
		"creation_date": "2022-02-04T10:17:13.629Z",
		"relevance": "HOT"
	},
	{
		"id": "269c315a-05b7-4fb1-8120-ff6e44bfbc98",
		"title": "Test8",
		"text": "text,...!",
		"creation_date": "2022-02-04T10:19:57.963Z",
		"relevance": "STANDARD"
	}
]
```

## Get one news article by id
**Request:**
Uri: `/news-articles/{id} [GET]`


**Response:**
Http Code: 200
```
{
	"id": "09991341-3cd4-434e-9619-5d11b3e8c992",
	"title": "Test6",
	"text": "text!!!!",
	"creation_date": "2022-02-04T10:17:13.629Z",
	"relevance": "HOT"
}
```

**Errors:**
```
Http Code: 404
Not Found Error
Occurs when the news article cannot be found
```

## Add news article
**Request:**
Uri: `/news-articles/ [POST]`
Payload:
```
{
"title": string,
"text": string (optional)
}
```

**Response:**
Http Code: 201
```
{
	"id": "09991341-3cd4-434e-9619-5d11b3e8c992",
	"title": "Test6",
	"text": "text!!!!",
	"creation_date": "2022-02-04T10:17:13.629Z",
	"relevance": "HOT"
}
```

## Modify news article
**Request:**
Uri: `/news-articles/{id} [PUT]`
Payload:
```
{
"title": string (optional),
"text": string (optional)
}
```

**Response:**
Http Code: 200
```
{
	"id": "09991341-3cd4-434e-9619-5d11b3e8c992",
	"title": "Test6",
	"text": "text!!!!",
	"creation_date": "2022-02-04T10:17:13.629Z",
	"relevance": "HOT"
}
```

**Errors:**
```
Http Code: 404
Not Found Error
Occurs when the news article cannot be found
```
