
    var letterValue=Math.floor(Math.random()*26);
    var letter=(letterValue + 9).toString(36).toUpperCase()
    //console.log((letterValue + 9).toString(36).toUpperCase());


    var sendLetter = document.querySelector('#randomletter');
    sendLetter.innerHTML=letter;


fetch('https://api.airtable.com/v0/appbA6TjVuxyfZc6O/word-as-image', {
    headers:{
        Authorization: 'Bearer keyctJlPuX2trmpxu',
    },
})
    .then(response=>response.json())
    .then(data=>{
    console.log(data);

   

    data.records.forEach(output=>  {
        console.log(output);
    });
});
