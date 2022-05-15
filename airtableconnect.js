// fetch('https://api.airtable.com/v0/appbA6TjVuxyfZc6O/word-as-image', {
//     headers:{
//         Authorization: 'Bearer keyctJlPuX2trmpxu',
//     },
// })
// .then(response=>response.json())
// .then(data=>{
// console.log(data);

// const outputContainer=document.querySelector('#gridgallery');

// data.records

// .forEach(output=>  {
//     //console.log(output);
//     var str = output.fields.Letter;
// var n = str.charCodeAt(0) - 65 +1;
//     console.log(n);

//     outputContainer.innerHTML+=`
//     <div class="gridsubitem" style="grid-row: ${n}">
//         <img src="${output.fields.Image[0].thumbnails.large.url}">
        
//     </div>
//     `
// });
// });


var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('appbA6TjVuxyfZc6O');

base('word-as-image').find('recdnfM7UWUr3PTAX', function(err, record) {
    if (err) { console.error(err); return; }
    console.log('Retrieved', record.id);
});


