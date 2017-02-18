var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
	'article-one': {
		title: "Article One",
		heading: "Article One",
		content: `Today I am working with nodejs and serving this html page.
			Article One description goes here`
	},

	'article-two': {
		title: "Article Two",
		heading: "Article Two",
		content: `Today I am working with nodejs and serving this html page.
			Article Two description goes here`
	},

	'article-three': {
		title: "Article Three",
		heading: "Article Three",
		content: `Today I am working with nodejs and serving this html page.
			Article Three description goes here`
	}

};

function createTemplate(data) {
	var title = data.title;
	var heading = data.heading;
	var content = data.content;

	var htmlTemplate =
		`<html>
		<head>
			<title> ${title} </title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link href="/ui/style.css" rel="stylesheet" />
		 </head>
		<body>
			<div class="container center">
				<div style="font-size:25px;">
					Introduction Mobile Application Developement
					<br>
					<br>
		            <img src="/ui/madi.png" class="img-article"/>
		        </div>
				<div style="padding-bottom: 10px";> 
					<a href="/"> Home </a>
				</div>
				<div>
					<strong>${heading}</strong> 
					<p>
						${content}
					</p>
				</div>
			</div>
		</body>
		</html>`;
	return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
	var articleName = req.params.articleName;
  	res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
