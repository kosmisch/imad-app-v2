var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool=require('pg').Pool;

var config={
    user: 'kosmisch',
    database: 'kosmisch',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articleOne= {
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
};

varhtmlTemplate=`<html>
<head>
    <title> Article one</title>
    <link href="/ui/style.css" rel="stylesheet" /> 
</head>
<body>
    <div class="container">
        
    <div>
  <a href="/"> Home</a> 
</div>

<h2>Article one</h2>
<div>
    <p>avhxvahxaxbajxbajxmzzknjnjbjbjb
    ;lkkmkninikniknhikhihishxizhuh
    smsnxsinxisxnsnxox</p>
    
        <p>avhxvahxaxbajxbajxmzzknjnjbjbjb
    ;lkkmkninikniknhikhihishxizhuh
    smsnxsinxisxnsnxox</p>
    
        <p>avhxvahxaxbajxbajxmzzknjnjbjbjb
    ;lkkmkninikniknhikhihishxizhuh
    smsnxsinxisxnsnxox</p>
    
</div>
</div>
</body>

</html>`;


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new Pool(config);
app.get('/test-db', function(req,res){
    pool.query('SELECT * FROM test', function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }
    else
    {
        res.send(JSON.stringify(result()));
    }
});
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
