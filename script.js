
    var letterValue=Math.floor(Math.random()*26);
    var letter=(letterValue + 9).toString(36).toUpperCase()
    //console.log((letterValue + 9).toString(36).toUpperCase());


    var sendLetter = document.querySelector('#randomletter');
    sendLetter.innerHTML=letter;


