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
//     <div class="gridsubitem">
//         <img src="${output.fields.Image[0].thumbnails.large.url}">
//     </div>
//     `
// });

// });



var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyctJlPuX2trmpxu'}).base('appbA6TjVuxyfZc6O');

// base('word-as-image').create({
//     "Contributor": "Test9",
//     "Letter": "A",
//     "Image": [
//       {
//         "url": "https://dl.airtable.com/.attachmentThumbnails/e758654e4cc9f73a8838697faf224f3f/c7d37440?ts=1652659385&userId=usrxoBrUHKUNWM3fK&cs=df100d2fbc941854"
//       }
//     ]
//   }, function(err, record) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(record.get('Contributor'));
//   });
const outputContainer=document.querySelector('#gridgallery');
var letterArray=[];
var lIndex=1;
var nIndex=0;
base('word-as-image').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 200,
    sort: [{field: "Letter", direction: "asc"}]

}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    for (var i=1; i<records.length-1; i++){
        
       
           

                let recordImage=records[i].get('Image');
                let recordLetter=records[i].get('Letter');
                let recordLetterNext=records[i-1].get('Letter');
                // console.log('Retrieved', recordImage);
                var str = recordLetter;
        var n = str.charCodeAt(0) - 65 +1;

            //     var strNext=recordLetterNext;
            //     var m = strNext.charCodeAt(0) - 65 +1;

            //     if (n!=m){
            //         nIndex=0;
            //         lIndex++;
            //     }
            //     nIndex++;
            //    // console.log( lIndex, nIndex, str);

            //     letterArray.push(
            //         {
            //             letterIndex: lIndex,
            //             iteration: nIndex,
            //             alphabet: str,
            //             alphabetURL: recordImage[0].thumbnails.large.url
            //         }
            //     )

            outputContainer.innerHTML+=`
            <div class="gridsubitem">
            <img src="${recordImage[0].thumbnails.large.url}">
            <p></p>
            </div>
                `
             
    }


//    for (var k=1; k<=records.length; k++){
//         outputContainer.innerHTML+=`
//                 <div class="gridsubitem" style=" background-color:black;">
//                 <img src="${letterArray.alphabetURL}">
//                 <p></p>
//                 </div>
//                 `
//    }


    // records.forEach(function(record) {

    //     let recordImage=record.get('Image');
    //     let recordLetter=record.get('Letter');
    //     console.log('Retrieved', recordImage);
       
    //     var str = recordLetter;
    //     var n = str.charCodeAt(0) - 65 +1;
    //         console.log(n);
    //     outputContainer.innerHTML+=`
    //     <div class="gridsubitem" style=" background-color:black;">
    //     <img src="${recordImage[0].thumbnails.large.url}">
    //     <p></p>
    //     </div>
    //     `
     
    // });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
   // console.log(letterArray)

}, function done(err) {
    if (err) { console.error(err); return; }
});





