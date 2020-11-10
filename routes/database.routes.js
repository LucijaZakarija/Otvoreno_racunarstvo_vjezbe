

const express = require('express');
const router = express.Router();
const db = require('../db');
var fs = require('fs');
//const { convertArrayToCSV } = require('convert-array-to-csv'); ovaj način ne vrača dobro song nego samo album
const converter = require('json-2-csv'); // potrebno npm install json2csv --save


/*function json2csv(json) { //ne radi dobro
  const items = json.response;
  const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
  const header = Object.keys(items[0])
  let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  csv.unshift(header.join(','))
  csv = csv.join('\r\n')
 return csv;
} */
router.get('/', async function (req, res) {

    const [categories, items] = (await Promise.all([
        db.query('SELECT * FROM album'),
        db.query('SELECT * FROM song'),
    ])).map(result => result.rows);

  
    for (const category of categories) {
        category.items = items.filter(item => (item.fromalbum === category.albumtitle));
    }
   

    res.render('datatable', {
        title: 'Datatable',
        linkActive: 'datatable',
        categories: categories,
        quote: "",
        search: "",
    });
});

router.post('/', async function (req, res) {

    const [categories, items] = (await Promise.all([
        db.query('SELECT * FROM album'),
        db.query('SELECT * FROM song'),
    ])).map(result => result.rows);

    for (const category of categories) {
        category.items = items.filter(item => (item.fromalbum === category.albumtitle));
    }


    let ime = req.body.quote;
    let pretraga = req.body.search;
    var noviJSON = [];
    var uzmi = fs.readFileSync('Album.json');
    var original = JSON.parse(uzmi);
    var csvFromArrayOfObjects;


    if(pretraga=="svapolja"){ 
  
      for(let category of categories){
       if ((category.albumtitle.includes(ime)) || (category.wikipedia.includes(ime) ) ||
       (category.artist.includes(ime)) || (category.genre.includes(ime)) || (category.lengthalbum.includes(ime) )
        || (category.musiclabel.includes(ime)) || (ime==category.released) || (ime==category.metacritic )
       ||  (ime==category.numberofsingles) ) {
            console.log(category.albumtitle)
         for(let i of original){
             
           if(category.albumtitle==i.albumtitle && !noviJSON.includes(i)){ //dovrši
             
             noviJSON.push(i);
           } 
         }
        
       } else {
        for (const item of category.items) { 
          if ( item.lengthsong.includes(ime) || item.songtitle.includes(ime)){
             console.log(item.songtitle)
            for(let i of original){
                console.log(i.songtitle)
              if(category.albumtitle==i.albumtitle && !noviJSON.includes(i)){
                
                noviJSON.push(i);
              } 
            }
           
          }
          }
       }
   }

   converter.json2csv(noviJSON, (err ,csvFromArrayOfObjects) => {
    if (err) {
        throw err;
    }

    fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );
});
   fs.writeFileSync('Album_2.json', JSON.stringify(noviJSON, null, 2)); 
   }
    if(pretraga=="wiki"){ 
       for(let category of categories){
        if (category.wikipedia.includes(ime)){
         for(let al of original){
             if(category.wikipedia.includes(al.wikipedia)){
              
              noviJSON.push(al);
            } 
          }
         
        }
    }
    converter.json2csv(noviJSON, (err ,csvFromArrayOfObjects) => {
      if (err) {
          throw err;
      }
  
      fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );
  });
    fs.writeFileSync('Album_2.json', JSON.stringify(noviJSON, null, 2)); 
    } else 
    if(pretraga == "albumtitle" ){
    for(let category of categories){
        if (category.albumtitle.includes(ime)){
          for(let al of original){   
            if(category.albumtitle.includes(al.albumtitle) &&  !noviJSON.includes(al)){
              
              noviJSON.push(al);
            } 
          }
         
        }
    }
    converter.json2csv(noviJSON, (err ,csvFromArrayOfObjects) => {
      if (err) {
          throw err;
      }
  
      fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );
  });
    fs.writeFileSync('Album_2.json', JSON.stringify(noviJSON, null, 2));
  }
     else if(pretraga=="artist"){


       for(let category of categories) {
        if (category.artist.includes(ime)){
     
          for(let art of original){
              
            if(category.artist.includes(art.artist) &&  !noviJSON.includes(art)){
              
              noviJSON.push(art);
            } 
          }
         
        }
    }
    converter.json2csv(noviJSON, (err ,csvFromArrayOfObjects) => {
      if (err) {
          throw err;
      }
  
      fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );
  });
    fs.writeFileSync('Album_2.json', JSON.stringify(noviJSON, null, 2));
  } else if(pretraga=="genre"){
    for(let category of categories) {
      if (category.genre.includes(ime)){
   
        for(let al of original){
            
          if(category.genre==al.genre  &&  !noviJSON.includes(al)){
            
            noviJSON.push(al);
          } 
        }
       
      }
  }
  converter.json2csv(noviJSON, (err ,csvFromArrayOfObjects) => {
    if (err) {
        throw err;
    }

    fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );
});
  fs.writeFileSync('Album_2.json', JSON.stringify(noviJSON, null, 2));
} else if(pretraga=="lengthalbum"){




for(let category of categories) {
    if (category.lengthalbum.includes(ime)){
 
      for(let al of original){
          
        if(category.lengthalbum.includes(al.lengthalbum) && !noviJSON.includes(al)){
          
          noviJSON.push(al);
        } 
      }
     
    }
}
converter.json2csv(noviJSON, (err ,csvFromArrayOfObjects) => {
  if (err) {
      throw err;
  }

  fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );
});
fs.writeFileSync('Album_2.json', JSON.stringify(noviJSON, null, 2));
} else if(pretraga=="musiclabel"){




for(let category of categories) {
    if (category.musiclabel.includes(ime)){
      for(let al of original){
          if(category.musiclabel.includes(al.musiclabel) &&  !noviJSON.includes(al)){      
          noviJSON.push(al);
        } 
      }
     
    }
}
converter.json2csv(noviJSON, (err ,csvFromArrayOfObjects) => {
  if (err) {
      throw err;
  }

  fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );
});
fs.writeFileSync('Album_2.json', JSON.stringify(noviJSON, null, 2));
} else if(pretraga=="musiclabel"){

for(let category of categories) {
    if (category.musiclabel.includes(ime)){
 
      for(let al of original){
        
        if(category.musiclabel.includes(al.musiclabel) &&  !noviJSON.includes(al)){
          
          noviJSON.push(al);
        } 
      }
     
    }
}
converter.json2csv(noviJSON, (err ,csvFromArrayOfObjects) => {
  if (err) {
      throw err;
  }

  fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );
});
fs.writeFileSync('Album_2.json', JSON.stringify(noviJSON, null, 2));
} else if(pretraga=="released"){ //ovako jer je datum
 for(let category of categories) {
  if (ime==category.released){
    
    for(let al of original){
        
      if(category.albumtitle==al.albumtitle &&  !noviJSON.includes(al)){
        
        noviJSON.push(al);
        } 
      }
     
    }
}
converter.json2csv(noviJSON, (err ,csvFromArrayOfObjects) => {
  if (err) {
      throw err;
  }

  fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );
});
fs.writeFileSync('Album_2.json', JSON.stringify(noviJSON, null, 2));
} else if(pretraga=="metacritic"){
for(let category of categories) {
  var a=0;
    if (category.metacritic==ime ){
      for(let al of original){
          
        if(category.metacritic==al.metacritic &&!noviJSON.includes(al)) { 
       
          console.log("pusham")
        console.log(category.albumtitle)
        console.log(a)
       
          noviJSON.push(al);
          a++;
        
         
        } 
      }
     
    }
}
converter.json2csv(noviJSON, (err ,csvFromArrayOfObjects) => {
  if (err) {
      throw err;
  }

  fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );
});
fs.writeFileSync('Album_2.json', JSON.stringify(noviJSON, null, 2)); 
} else if(pretraga=="numberofsingles"){
 for(let category of categories) {
    var a=0;
      if (category.numberofsingles==ime ){
        for(let or of original) {
            
          if(category.numberofsingles==or.numberofsingles && !noviJSON.includes(or)){ 
         
            console.log("pusham")
          console.log(category.albumtitle)
          console.log(a)
         
            noviJSON.push(or);
            a++;
  
          
           
          } 
        }
       
      
    
  }
}
converter.json2csv(noviJSON, (err ,csvFromArrayOfObjects) => {
  if (err) {
      throw err;
  }

  fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );
});
fs.writeFileSync('Album_2.json', JSON.stringify(noviJSON, null, 2));
} 
else if(pretraga=="songtitle"){
for(let category of categories) {
    for (const item of category.items) { 
    if ( item.songtitle.includes(ime) ){
       console.log(item.songtitle)
      for(let al of original){
          console.log(al.songtitle)
        if(category.albumtitle==al.albumtitle && !noviJSON.includes(al)){
          
          noviJSON.push(al);
        } 
      }
     
    }
    }
  }
  converter.json2csv(noviJSON, (err ,csvFromArrayOfObjects) => {
    if (err) {
        throw err;
    }

    fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );
});
fs.writeFileSync('Album_2.json', JSON.stringify(noviJSON, null, 2)); 
}else if(pretraga=="lengthsong"){

   for(let category of categories) {
    for (const item of category.items) { 
    if ( item.lengthsong.includes(ime) ){
       console.log(item.songtitle)
      for(let al of original){
          console.log(al.songtitle)
        if(category.albumtitle==al.albumtitle && !noviJSON.includes(al)){
          
          noviJSON.push(al);
        } 
      }
     
    }
    }
  }
  converter.json2csv(noviJSON, (err ,csvFromArrayOfObjects) => {
    if (err) {
        throw err;
    }

    fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );
});
  /*csvFromArrayOfObjects = convertArrayToCSV(noviJSON);
  console.log( csvFromArrayOfObjects);
  fs.writeFileSync('Album_2.csv',csvFromArrayOfObjects );*/
fs.writeFileSync('Album_2.json', JSON.stringify(noviJSON, null, 2)); 
}
    

    res.render('datatable', {
        title: 'Datatable',
        linkActive: 'datatable',
        categories: categories,
        quote: req.body.quote,
        search: req.body.search,
    
    });


});

module.exports = router;
