var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config={
    user:'kosmisch',
    database: 'kosmisch',
    host:'db.imad.hasura-app.io',
    port: '5432',
    password:process.env.DB_PASSWORD
};



var app = express();
app.use(morgan('combined'));



function createTemplate (data){
 var title=data.title;
 var heading=data.heading;
 var content=data.content;
var htmlTemplate=`<html>
<head>
    <title> ${title}</title>
    <link href="/ui/style.css" rel="stylesheet" /> 
</head>
<body>
    <div class="container">
        
    <div>
  <a href="/"> Home</a> 
</div>

<h2>${heading}</h2>
<div>
  ${content}
    
</div>
<div> ${image} </div>
</div>
</body>

</html>`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new Pool(config);
app.get('/test-db', function (req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500);
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});



app.get('/articles/:articleName', function (req,res){
    // articleName==articleOne
   // var articleName= req.params.articleName;
// res.send(createTemplate(articles[articleName]));
pool.query("SELECT * FROM articles WHERE title=$1",[req.params.articleName],function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }
    else
    {
        if(result.rows.length===0)
        {res.status(404).send('Article not found');
    }
    else
    {
        var articleData=result.rows[0];
        res.send(createTemplate(articleData));
    }
}
});
});


//app.get('/profile/image', function(req, res){

     //some code to find the path to the image associated with some user

    // var img = fs.readFileSync('path to file');
    // res.writeHead(200, {'Content-Type': 'image/gif' });
    // res.end(img, 'binary');
//})



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
