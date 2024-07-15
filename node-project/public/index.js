
  let imgLinks = ['images/rival_sons_1.png', 'images/rival_sons_2.png', 'images/rival_sons_3.png'];
  let counter = 0;
  
  $('.next').click(function() {
    if(counter < imgLinks.length-1) {
        
    counter = counter === imgLinks.length - 1 ? 0 : counter + 1;
    $('#main').css({
        'background-image': 'url(' + imgLinks[counter] + ')',
    });
    }
  });
  
  $('.prev').click(function() {
    if(counter > 0) {
        counter = counter === 0 ? imgLinks.length - 1 : counter - 1;
        $('#main').css({
            'background-image': 'url(' + imgLinks[counter] + ')',
        });
    }
  });
  
  
    // Hide the album records initially
    $('.album-records').css('opacity', '0');
  
    // Load albums data and populate the template
    $.getJSON("json/albums.json", function(data) {
        let template = '';
        data.albums.forEach(element => {
            template += `
            <div class="album-item">
                <img src="${element.cover}" >
                <h3 class="bookTitle">${element.title}</h3>
                <span class="year">${element.year}</span>
                <span class="address"><a href="${element.cover}">Get this record</a></span>
            </div>`;
        });
        $('.album-records').html(template);
    }).fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.error("Error loading albums.json: " + err);
    });
  
    // Scroll event listener
    $(window).scroll(function() {
        // Get the position of .album-records relative to the viewport
        var albumRecordsOffsetTop = $('.album-records').offset().top;
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
  
        // Check if .album-records is within the viewport
        if (albumRecordsOffsetTop <= (scrollTop + windowHeight * 0.8)) {
            // Animate to fade in when visible
            $('.album-records').css('opacity', '1');
        }
    });
  
      // Load the initial events
      loadEvents(0, 4); // Load the first 4 events
    
      // Handle the "Load More" button click
      $('#loadMore').on('click', function() {
        let loadedEvents = $('.table-rows').length; // Get the number of events already loaded
        loadEvents(loadedEvents, loadedEvents + 4); // Load the next 4 events
      });
  
    
    function loadEvents(startIndex, endIndex) {
      $.getJSON("json/events.json", function(data) {
        let template = '';
    
        // Iterate through the events, starting from startIndex and ending at endIndex
        for (let i = startIndex; i < endIndex && i < data.events.length; i++) {
          let element = data.events[i];
          let available = element.status ? 'Available' : 'Sold Out';
          template += `
            <tr class="table-rows">
              <td>${element.date}</td>
              <td>${element.venue}</td>
              <td>${element.location}</td>
              <td><button class="table-btn">${available}</button></td>
            </tr>
          `;
        }
    
        $('.event-table').append(template); // Append the new rows to the table
    
        // Update the "Load More" button based on the loaded events
        if (endIndex >= data.events.length -1) {
          $('#loadMore').hide(); // Hide the button if all events are loaded
        }
      });
    }  
 
