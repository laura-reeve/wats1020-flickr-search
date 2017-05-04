// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
    // Place your code here, inside the document ready handler.

    // Create a function called `searchImages()`. This function will handle the
    // process of taking a user's search terms and sending them to Flickr for a
    // response.
        function searchImages(tags) {
          // Inside the `searchImages()` function, the following things should happen:
        // 1.   Accept a string value called `tags` as an argument. Example:
        //      `var searchPhotos = function(tags)
        //   Define the location of the Flickr API like this:
        //      `var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";`
            var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&format=json";
              console.log(tags);
              $("images").innerHTML = "<li class='search-throbber'>Searching...</li>";
        //      Construct a `$.getJSON()` call where you send a request object
        //      including the tags the user submitted, and a `done()` handler
        //      that displays and refreshes the content appropriately.
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
              var newLink = $("<a>").attr("href", item.link).text("View on Flickr").appendTo(newListItem);
              
        //      Update the display to add the images to the list with the id #images
        //      `#images`.
            $(newListItem).appendTo("#images");
            if (i === 4) {
              return false;
            }   // if statement
         });  // .each statement   
       });  // .getJSON statement    
      }   // searchImages statement
         

    // Attach an event to the search button (`button.search`) to execute the
    // search when clicked.
        $("button.search").click(function(event) {
          // Prevent the default event execution
          event.preventDefault();
          // Get the value of the 'input[name="searchText"]' and use that
          // as the `tags` value you send to `searchImages()`
          var searchTextInput = $(event.target.parentElement).find("input[name='searchText']")[0];
          // Execute the `searchImages()` function to fetch images for the
          // user.
          searchImages(searchTextInput.value);
        }); // search button
  
    });  // ready      

    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target
