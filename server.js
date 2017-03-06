var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool=require('pg').Pool;

var config={
    user:'kosmisch',
    database: 'kosmisch',
    host:'db.imad.hasura-app.io',
    port: '5432',
    password:process.env.DB_PASSWORD
};



var app = express();
app.use(morgan('combined'));


var articles={
     'article-one': {
    title: 'Article One',
    heading: 'Article One',
    content:`    <p>avhxvahxaxbajxbajxmzzknjnjbjbjb
    ;lkkmkninikniknhikhihishxizhuh
    smsnxsinxisxnsnxox</p>
    
        <p>avhxvahxaxbajxbajxmzzknjnjbjbjb
    ;lkkmkninikniknhikhihishxizhuh
    smsnxsinxisxnsnxox</p>
    
        <p>avhxvahxaxbajxbajxmzzknjnjbjbjb
    ;lkkmkninikniknhikhihishxizhuh
    smsnxsinxisxnsnxox</p>`
},
     'article-two':{title: 'Article Two',
    heading: 'Article Two',
    content:`    <p>avhxvahxaxbajxbajxmzzknjnjbjbjb
    ;lkkmkninikniknhikhihishxizhuh
    smsnxsinxisxnsnxox</p>
    
        <p>avhxvahxaxbajxbajxmzzknjnjbjbjb
    ;lkkmkninikniknhikhihishxizhuh
    smsnxsinxisxnsnxox</p>`},
     'article-three':{title: 'Article Three',
    heading: 'Article Three',
    content:`    <p>avhxvahxaxbxizhuh
    smsnxsinxisxnsnxox</p>
    
        <p>avhxvahxaxbajxbajxmzzknjnjbjbjb
    ;lkkmkninxizhuh
    smsnxsinxisxnsnxox</p>
    
        <p>avhxvahxaxbajxbajxmzzknjnjbjbjb
    ;lkkmknihuh
    smsnxsinxisxnsnxox</p>`}
};
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
            res.send(JSON.stringify(result));
        }
    });
});



app.get('/:articleName', function (req,res){
    // articleName==articleOne
    var articleName= req.params.articleName;
 res.send(createTemplate(articles[articleName]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
 
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
