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

// for (var i=data.records.length; i<data.records.length+1; i++){
//     console.log("HELLO"+i)
// }
// });



var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyctJlPuX2trmpxu'}).base('appbA6TjVuxyfZc6O');

const outputContainer=document.querySelector('#gridgallery');

base('word-as-image').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 7,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {

        let recordImage=record.get('Image');
        let recordLetter=record.get('Letter');
        console.log('Retrieved', recordImage);
       
        var str = recordLetter;
        var n = str.charCodeAt(0) - 65 +1;
            console.log(n);
        outputContainer.innerHTML+=`
        <div class="gridsubitem" style="grid-row: ${n}">
        <img src="${recordImage[0].thumbnails.large.url}">
        <p></p>
        </div>
        `
     
            // outputContainer.innerHTML+=`
            // <div class="gridsubitem" style="grid-row: ${n}">
            //     <img src="">
            // </div>
            // `
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
