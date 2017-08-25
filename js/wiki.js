$(document).ready(function(){
  const searchBar = document.getElementById("lookup");

  $('#lookup').keypress( (key) => {
    if (key.which==13){ // WHEN ENTER IS HIT
      //clear any previous results
      document.getElementById("resultCards").innerHTML = "";

      //BUILD API REQUEST
      const API = `https://en.wikipedia.org/w/api.php?format=json&callback=?&action=query&generator=search&gsrnamespace=0&gsrsearch=${searchBar.value}&gsrlimit=12&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&pithumbsize=500`;

      //Make request
      $.getJSON(API, (data) => {
        $.each(data.query.pages, (idx, val) => {
          const title = val.title;
          // const url = "https://en.wikipedia.org/wiki/" + title.split(" ").join("_");
          const url = `https://en.wikipedia.org/wiki/${title.split(" ").join("_")}`;

          //build the card
          let cardHTML = `<div class="animated fadeInRight col-xs-12 col-xs-4"><div class="cardd">
                          <a class="img-card" href="${url}" target="_blank">`
          if (val.thumbnail) {
            //add thumnail if there is one on the page, else add a "no image available" pic
            cardHTML += `<img src="${val.thumbnail.source}"/></a>`;
          }
          else {
            cardHTML += '<img src="https://s3-us-west-1.amazonaws.com/personalprojectfiles/noimage.jpg" /></a>';
          }
          cardHTML += '<br /><div class="card-content">';
          cardHTML += '<h4 class="card-title">';
          if (title.length < 22) { // truncate the title if it is too long
            cardHTML += `<a href="${url}" target="_blank">${title}</a></h4>`;
          }
          else {
            const words = title.split(" ");
            cardHTML += `<a href="${url}" target="_blank">${title.slice(0,22)}...</a></h4>`;
          }
          if (val.extract.length < 80) { //truncate the extract if it is too long
            cardHTML += `<div class="cardDescription">${val.extract}</div>`;
          }
          else {
            cardHTML += `<div class="cardDescription">${val.extract.slice(0,75)}...</div>`;
          }
          cardHTML += `<div class="card-read-more">
                        <a class="btn btn-link btn-block" href="${url}" target="_blank">See Article </a></div></div></div>`;

          $('#resultCards').append(cardHTML);

        }) //end of each statement

      }) // end of getJSON

  }}); //keypress

}); //document.ready


//formatted html for the card:
// <div class="col-xs-12 col-sm-4">
//   <div class="cardd">
//       <a class="img-card" href=" ' + url + ' ">
//           <img src=" ' + image + '" />
//       </a>
//       <br />
//       <div class="card-content">
//           <h4 class="card-title">
//               <a href=""+url+"">
//                   ' + title + '
//               </a>
//           </h4>
//           <div class="">
//               ' + snippet + '
//           </div>
//       </div>
//       <div class="card-read-more">
//           <a class="btn btn-link btn-block" href=" ' + url + ' ">
//               See Article
//           </a>
//       </div>
//   </div>
// </div>
