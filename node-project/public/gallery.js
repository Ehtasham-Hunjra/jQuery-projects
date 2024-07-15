let x = 0;

loadEvents(0, 4); // Load the first 4 events
    
// Handle the "Load More" button click
let loadCounter = 1;
$('.load-more').on('click', function() {
    loadCounter++;
//     console.log($('.gallery-image').length);
//   let loadedEvents = $('.gallery-image').length; // Get the number of events already loaded
console.log(loadCounter);
  loadEvents(x, loadCounter); // Load the next 4 events
});

let template = '';
function loadEvents(startIndex, endIndex) {
$.getJSON("json/gallery.json", function(data) {
//   console.log(data.gallery.length);
  // Iterate through the events, starting from startIndex and ending at endIndex
  for (let i = 0; i < 4 && i < data.gallery.length; i++) {
    template = ``;
    x++;
    let element = data.gallery[x];
    template += `<img src="${element.location}" alt="Image ${x}"></img>`;
    $(`.box${i+1}`).append(template);
  }

//   $('.gallery-image').append(template); // Append the new rows to the table

  // Update the "Load More" button based on the loaded events
  console.log(x);
  if (x >= data.gallery.length) {
    $('.load-more').hide(); // Hide the button if all events are loaded
  }
});
}  

// let x = 0;

// loadEvents(0, 4); // Load the first 4 events
    
// // Handle the "Load More" button click
// let loadCounter = 1;
// $('.load-more').on('click', function() {
//     loadCounter++;
//     loadEvents(x, loadCounter); // Load the next 4 events
// });

// function loadEvents(startIndex, endIndex) {
//     $.getJSON("json/gallery.json", function(data) {
//         // Iterate through the events, starting from startIndex and ending at endIndex
//         let j = 0;
//         for (let i = startIndex; i < 4 && i < data.gallery.length; i++) {
            
//             let element = data.gallery[i];
//             let template = `<img src="${element.location}" alt="Image ${i + 1}">`;
//             $(`.box${j+1}`).append(template);
//             x++;
//         }

//         // Update the "Load More" button based on the loaded events
//         if (x >= data.gallery.length) {
//             $('.load-more').hide(); // Hide the button if all events are loaded
//         }
//     });
// }
