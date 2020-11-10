# Otvoreno_racunarstvo_vjezbe
Laboratorijske vježbe iz predmeta Otvoreno računarstvo.  
Otvorena licencija: Creative Commons Zero v1.0 Universal  
Autor : Lucija Zakarija  
Verzija : 2.0  
Jezik podataka u bazi je engleski, a sama stranica je na hrvatskom U bazi se nalaze 2 entiteta : Album i Song  
Atributi navedeni u bazi :  
Atributi uz Album:  
albumtitle - primarni ključ, svaki album ima svoje posebno ime  
wikipedia- wiki handle na album  
artist- ime izvođača  
genre- žanr kojem album pripada  
lenghtalbum- duljina albuma izražena kao sati:minute:sekunde  
musiclabel- izdavačka kuća  
released- datum izdavanja albuma  
metacritic- broj koji je album ostvario prema Metacriticu u vrijednosti 0-100  
numberofsingles- broj singleova s albuma  
Atributi uz Song:  
songtitle- ime pjesme, primarni ključ  
lengthsong- duljina pjesme izražena ako sati:minute:sekunde  
fromalbum- FK, veza 1:n s albumom  
