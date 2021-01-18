const express = require('express');
const router = express.Router();
const db = require('../db');
const request = require('request');
var fs= require('fs');
var http = require('http');


const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', callback)
  })
}

const fetch = require('node-fetch');

var hateoasLinker = require('express-hateoas-links');
var bodyParser = require('body-parser');
var cors = require('cors');
router.use(cors());

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
     res.sendStatus(200);
   }
   else {
     next();
   }});



express()
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json());



router.use(hateoasLinker);



router.get('/albums', async function (req, res, next) {
    const Albumi = 'SELECT * from album';
    hateoasLinker.apply;
    try {
    var  AlbumiLista = (await db.query(Albumi, [])).rows;
 console.log("lalala" + AlbumiLista)

 brojAlbuma = AlbumiLista.length
console.log( AlbumiLista.length + "lalalalala")
var i=0;

while(i<brojAlbuma) {
  AlbumiLista[i].picture= "/albums/wikipedia/" + AlbumiLista[i].wikipedia+ "/picture";
console.log(AlbumiLista[i].picture);
i++;
}
   
      res.status(200).json({
          status:"OK",
          message:"Fetched Albums",
          response:{"@context": {
            "artist": "https://schema.org/artist",
            "metacritic":"https://schema.org/CriticReview"
          },AlbumiLista},
          links:[  
      { rel: "self", method: "GET", href: '/albums' },
      { rel: "read", method: "GET", title: 'get all songs', href: '/songs' },
      { rel: "wikipedia", method: "GET", title: 'get all albums with that Wiki handle', href: '/albums/wikipedia/:wikipedia' },
      { rel: "artist", method: "GET", title: 'get all albums from same artist', href: '/albums/artist/:artist' },
      { rel: "label", method: "GET", title: 'get all albums from same label', href: '/albums/label/:label' },
      { rel: "delete", method: "DELETE", title: 'Delete album', href: '/albums/:title' }
    ]});
     } catch(err){
        console.log(err.status);
    }
       
        let categoryItemMap = {};
 
});
router.get('/songs', async function (req, res, next) {
  const Albumi = 'SELECT * from song';
  hateoasLinker.apply;
  try {
  var  AlbumiLista = (await db.query(Albumi, [])).rows;
 
    res.status(200).json({
        status:"OK",
        message:"Fetched Songs",
        response: AlbumiLista,
        links:[  
    { rel: "self", method: "GET", href: '/songs' },
    { rel: "read", method: "GET", title: 'get all albums', href: '/albums' },
    { rel: "create", method: "POST", title: 'Create song', href: '/songs' },
    { rel: "update", method: "PUT", title: 'Update song', href: '/songs/:name'},
    
  ]});
   } catch(err){
      console.log(err.status);
  }
     
      let categoryItemMap = {};

});
//promjena
router.get('/songsFromAlbum/:id', async function (req, res, next) {
  const Albumi="SELECT songtitle,lengthsong from song natural join album where musiclabel LIKE '%"+ req.params.id+ "%' OR artist LIKE '%"+ req.params.id+ "%' OR wikipedia LIKE '%"+ req.params.id+ "%' ";



  hateoasLinker.apply;
  try {
  var  AlbumiLista = (await db.query(Albumi, [])).rows;
 
    res.status(200).json({
        status:"OK",
        message:"Fetched Songs",
        response:AlbumiLista,
        links:[  
    { rel: "self", method: "GET", href: '/songsFromAlbum' + req.params.id},
    { rel: "read", method: "GET", title: 'get all albums', href: '/albums' }
  ]});
   } catch(err){
      console.log(err.status);
  }
     
      let categoryItemMap = {};


});

router.get('/albums/label/:label', bodyParser.json(),async function (req, res, next) {
  const Albumi = "SELECT * from album where musiclabel LIKE '%"+ req.params.label+ "%' ";
var la ='/albums/label/' ;
var li=req.params.label ;

  console.log("AAAA" + req.params.label)
  console.log(Albumi.length);
  hateoasLinker.apply;

  try {
  var  AlbumiLista = (await db.query(Albumi, [])).rows ;
  var an=JSON.stringify(AlbumiLista)
var na= JSON.parse(an)

console.log(AlbumiLista[0].wikipedia)
console.log(AlbumiLista[0])
//AlbumiLista[0].slika= "/albums/wikipedia/" + AlbumiLista[0].wikipedia+ "/picture";
//console.log(AlbumiLista[0].slika)

brojAlbuma = AlbumiLista.length
console.log( AlbumiLista.length + "lalalalala")
var i=0;

while(i<brojAlbuma) {
  AlbumiLista[i].picture= "/albums/wikipedia/" + AlbumiLista[i].wikipedia+ "/picture";
console.log(AlbumiLista[i].picture);
i++;
}
    
//for(i = 0; i < brojAlbuma; i++) {​​​​​
////  AlbumiLista[i].slika =  "/albums/wikipedia/" + AlbumiLista[i].wikipedia+ "/picture";
//}
   
    if(AlbumiLista<=0) {
      res.status(404).json({
        status: 'Not Found',
        message: 'There is no album with that label',
        response: null
    });
    } 

    
    res.status(200).json({
        status:"OK",
        message:"Fetched Albums",
        response:{"@context": {
          "artist": "https://schema.org/artist",
          "metacritic":"https://schema.org/CriticReview"
        }, AlbumiLista },
        links:[  
    { rel: "self", method: "GET", href: la + li},
    { rel: "read", method: "GET", title: 'get all songs', href: '/songsFromAlbum/' + li }
  ]});
   } catch(err){
      console.log(err.status);
  } 
//} else {
      router.use((req, response, next) => {
    response.status(404)
    console.log("tu sam")
  
    
});
 // }
      let categoryItemMap = {};

});

//obrisi album ovisno o imenu, promjena !!

router.delete('/albums/:title', async function (req, res, next) {
  const pom= "SELECT  from album where albumtitle LIKE '%"+ req.params.title+ "%'"
  const Albumi = "DELETE  from album where albumtitle LIKE '%"+ req.params.title+ "%'";
var la ='/albums/label/' ;
var li=req.params.label ;


  console.log("AAAA" + req.params.label)
  hateoasLinker.apply;
  try {
   
    var  AlbumiLista1 = (await db.query(pom, [])).rows ;
  console.log()
  if(AlbumiLista1<=0) {
    res.status(404).json({
      status: 'Not Found',
      message: 'There is no album with that title',
      response: null
  });
  } 
  var  AlbumiLista = (await db.query(Albumi, [])).rows ;
    res.status(200).json({
        status:"OK",
        message:"Deleted album",
       
        links:[  
    { rel: "self", method: "DELETE", href: la + li},
  
  ]});
   } catch(err){
      console.log(err.status);
  }
     
      let categoryItemMap = {};

});
//ovo

router.get('/albums/wikipedia/:wikipedia', async function (req, res, next) {
  const Albumi = "SELECT * from album where wikipedia LIKE '%"+ req.params.wikipedia+ "%' ";

  
  hateoasLinker.apply;
  try {
  var  AlbumiLista = (await db.query(Albumi, [])).rows ;
  console.log()

  if(AlbumiLista<=0) {
    res.status(404).json({
      status: 'Not Found',
      message: 'There is no album with that Wiki handle',
      response: null
  });
  } 
  brojAlbuma = AlbumiLista.length
console.log( AlbumiLista.length + "lalalalala")
var i=0;

while(i<brojAlbuma) {
  AlbumiLista[i].picture= "/albums/wikipedia/" + AlbumiLista[i].wikipedia+ "/picture";
console.log(AlbumiLista[i].picture);
i++;
}
    res.status(200).json({
        status:"OK",
        message:"Fetched Albums",
        response:{"@context": {
          "artist": "https://schema.org/artist",
          "metacritic":"https://schema.org/CriticReview"
        }, AlbumiLista },
        links:[  
    { rel: "self", method: "GET", href: '/albums/wikipedia/' + req.params.wikipedia },
    { rel: "read", method: "GET", title: 'get all songs', href: '/songsFromAlbum/'   + req.params.wikipedia }
  ]});
   } catch(err){
      console.log(err.status);
  }
     
      let categoryItemMap = {};

}); //nije dokumentiran
router.get('/albums/artist/:artist', async function (req, res, next) {
  const Albumi = "SELECT * from album where artist LIKE '%"+ req.params.artist+ "%' ";


  hateoasLinker.apply;
  try {
  var  AlbumiLista = (await db.query(Albumi, [])).rows ;
  console.log()
  if(AlbumiLista<=0) {
    res.status(404).json({
      status: 'Not Found',
      message: 'There is no album with that artist',
      response: null
  });
  } 
  brojAlbuma = AlbumiLista.length
  console.log( AlbumiLista.length + "lalalalala")
  var i=0;
  
  while(i<brojAlbuma) {
    AlbumiLista[i].picture= "/albums/wikipedia/" + AlbumiLista[i].wikipedia+ "/picture";
  console.log(AlbumiLista[i].picture);
  i++;
  }
    res.status(200).json({
        status:"OK",
        message:"Fetched Albums",
        response:{"@context": {
          "artist": "https://schema.org/artist",
          "metacritic":"https://schema.org/CriticReview"
        }, AlbumiLista },
        links:[  
    { rel: "self", method: "GET", href: '/albums/artist/' + req.params.artist }, 
    { rel: "read", method: "GET", title: 'get all songs from artist', href: '/songsFromAlbum/'+ req.params.artist  }
  ]});
   } catch(err){
      console.log(err.status);
  }
     
      let categoryItemMap = {};

});

//post za dodati pjesmu
router.post('/songs',bodyParser.json(), async function (req, res, next) {
var la ='/songs' ;
//a ako vec postoji hmhm
const pom="SELECT * FROM SONG WHERE songtitle LIKE '%"+ req.body.songtitle+ "%' "
const Albumi= "INSERT INTO Song VALUES ('"+ req.body.songtitle+ "','"+ req.body.fromalbum+ "','"+ req.body.lengthsong+ "') ";

  hateoasLinker.apply;
  console.log(req.body);
  try {

    var  AlbumiLista1 = (await db.query(pom, [])).rows ;
    if(AlbumiLista1.length > 0) {
      res.status(400).json({
        status: 'Bad request',
        message: 'There is already a song with that name',
        response: null
    });
    }

  var  AlbumiLista = (await db.query(Albumi, [])).rows ;
  //trebalo bi 201 created
    res.status(200).json({
        status:"OK",
        message:"Added song",
 
        links:[  
    { rel: "self", method: "POST", href: la },
    { rel: "read", method: "GET", title: 'get all songs', href: '/songs' }
  ]});
   } catch(err){
      console.log(err.status);
  }
     
      let categoryItemMap = {};

});

//put za mjenjanje odakle je pjesma, promjenila u album
router.put('/songs/:name',bodyParser.json(), async function (req, res, next) {
  var la ='/songs/' ;
  var pom= "SELECT * from song where songtitle LIKE '%"+ req.params.name+ "%' "
  const Albumi= "Update Song SET songtitle = '"+ req.body.songtitle+ "', fromalbum = '"+ req.body.fromalbum+ "',lengthsong = '"+ req.body.lengthsong+ "' WHERE songtitle LIKE '%"+ req.params.name+ "%'";
  var li=req.params.name ;
  var an=JSON.stringify(req.body)
  var na= JSON.parse(an)
    hateoasLinker.apply;
    console.log(req.params.name)
    console.log(na)
    try {
  
    console.log()
  
   
    var  AlbumiLista1 = (await db.query(pom, [])).rows ;
    if(AlbumiLista1 <=0) {
      res.status(404).json({
        status: 'Not Found',
        message: 'There is no song with thata name',
        response: null
    });
    } 
    var  AlbumiLista = (await db.query(Albumi, [])).rows ;
      res.status(200).json({
          status:"OK",
          message:"Updated song",
   
          links:[  
      { rel: "self", method: "PUT", href: la + li },
      { rel: "read", method: "GET", title: 'get all songs', href: '/songs' }
    ]});
     } catch(err){
        console.log(err.status);
    }
       
        let categoryItemMap = {};
  
  });


  router.get('/albums/wikipedia/:wikipedia/picture', async function (req, res, next) {
    if (req.params.wikipedia=="Whatever_People_Say_I_Am,_That's_What_I'm_Not") {
      req.params.wikipedia="Whatever_People_Say_I_Am,_That%27s_What_I%27m_Not"
    }
   
    const Albumi = "SELECT * from picture where wikipedia LIKE '%"+ req.params.wikipedia+ "%' ";
    const Popravljeno = "Update Picture SET downloaded = CURRENT_TIMESTAMP where wikipedia LIKE '%"+ req.params.wikipedia+ "%' ";
    const Albumi1 = "SELECT * from album where wikipedia LIKE '%"+ req.params.wikipedia+ "%' ";
    const vrijeme = "SELECT * from picture where wikipedia LIKE '%"+ req.params.wikipedia+ "%' AND downloaded > CURRENT_TIMESTAMP::TIMESTAMP(0)  - '12 HOURS'::interval ";
  
    
    hateoasLinker.apply;
    try {
      console.log("iii"+req.params.wikipedia)
    var  AlbumiLista = (await db.query(Albumi, [])).rows ;
    var  AlbumiLista1 = (await db.query(Albumi1, [])).rows ;
    
   console.log("lala" +  AlbumiLista1[0])
   var  VrijemeLista = (await db.query(vrijeme, [])).rows ;
   if (VrijemeLista < 1) {
  console.log("tu sam")
  var  AlbumiLista3 = (await db.query(Popravljeno, [])).rows ;

    const put= "https://en.wikipedia.org/api/rest_v1/page/summary/" + AlbumiLista1[0].wikipedia;
    let slika = await (await fetch(put)).json();
    slika=JSON.parse(JSON.stringify(slika));
    res.sendFile(AlbumiLista[0].route); 

 
const sor=slika.originalimage.source;
const putanja= 'C:/FER/3.GODINA/5.semestar/OR/albumPravi/album/lab/images/'+AlbumiLista1[0].wikipedia+'.jpg'
console.log("ovo je " +sor)
console.log("ovo je  putanja"+putanja)




download(sor, putanja, () => {
  console.log(' Done!');
  res.sendFile('C:/FER/3.GODINA/5.semestar/OR/albumPravi/album/lab/images/'+AlbumiLista1[0].wikipedia+'.jpg');
})
    
  } else {
    res.sendFile('C:/FER/3.GODINA/5.semestar/OR/albumPravi/album/lab/images/'+AlbumiLista1[0].wikipedia+'.jpg');
  }

  
     } catch(err){
        console.log(err.status);
    }

       
  
  });




  router.use((req, response, next) => {
    response.status(501)
    response.json({
        status: 'Not Implemented',
        message: 'Method not implemented for requested resource',
        response: null
    });
});



 

module.exports=router;