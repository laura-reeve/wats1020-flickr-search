

// Asynchronous Flickr 
//
$(document).on('ready', function() {
// Create a function called `searchImages()`. This function will handle the
// process of taking a user's search terms and sending them to Flickr for a
// response.
  function searchImages(tags) {
// Inside the `searchImages()` function, the following things should happen:
// Accept a string value called `tags` as an argument. 
// Define the location of the Flickr API `
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
      console.log(tags);
      $("images").innerHTML = "<li class='search-throbber'>Searching...</li>";
// Construct a `$.getJSON()` call where you send a request object
// including the tags the user submitted, and a `done()` handler
// that displays and refreshes the content appropriately.
      $.getJSON( flickrAPI, {
        tags: tags,
        tagmode: "any",
        format: "json" 
    })
    .done(function (data) {
        $("li.placeholder").hide();
        $("#images").empty();
        $("h1.search-title").first()[0].innerHTML = "Search for: " + tags;
        $.each(data.items, function (i, item) {
          var newListItem = $("<li>");
          var newTitle = $("<p class='imageTitle'>").html(item.title).appendTo(newListItem);
          var newDate = $("<p class='imageDate'>").html(item.date_taken).appendTo(newListItem);
          var newDescription = $("<p class='imageDesc'>").html(item.description).appendTo(newListItem);
          var newAuthor = $("<p class='imageAuthor'>").html(item.author).appendTo(newListItem);
          var newLink = $("<a>").attr("href", item.link).text("View on Flickr ").appendTo(newListItem);

// modal button
    var newButton = $("<button class='btn btn-sm btn-primary'>Enlarge</button>").attr({
      'data-title': item.title,
      'data-toggle': "modal",
      'data-target': "#infoModal",
      'data-imgsrc': item.media.m,
      'data-description': item.description,
      'type': "button"
    }).appendTo(newListItem);

// update the display to add the images to the list with the id #images
          $(newListItem).appendTo("#images");
          if (i === 14) {
            return false;
          } // if statement
        }); // .each statement
      }); // .getJSON statement 
  } // searchImages statement

// Attach an event to the search button (`button.search`) to execute the
// search when clicked.

  $("button.search").click(function(event) {
    // Prevent the default event execution
    event.preventDefault();
    
// Get the value of the 'input[name="searchText"]' and use that
// as the `tags` value you send to `searchImages()`

    var searchTextInput = $(event.target.parentElement).find("input[name='searchText']")[0];

// Execute the `searchImages()` function to fetch images for the user

    searchImages(searchTextInput.value);
  }); // search button 

// modal window
  $('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var title = button.data('title'); // Extract info from data-* attributes
    var imgSrc = button.data('imgsrc');
    var imageDescription = button.data('description');
    
// Update the modal's content. We'll use jQuery here.
    var modal = $(this);
    modal.find('.modal-title').html(title);
    var modalBody = modal.find('.modal-body');
    modalBody.empty();
    var modalDescription = $("<p class='image-description'>").html(imageDescription).appendTo(modalBody);
  });

}); // ready 
