$(document).ready(function(){

    var apiKey = "mXrNG5FOo5nXpcCNFoDK5zPkXXow5Ojr";
    //we're going to need 3 parameters for the URL 
    // 1) q ====> the search term
    // 2) limit ====> amount of gifs we want
    // 3) rating ====> (rated G, PG, PG-13, etc);

    //the topic for this app will be rappers 
    var topicArray = ["kanye west", "tyler the creator", "asap rocky", "jay z", "mac miller", "kendrick lamar", "travis scott",
                        "kid cudi", "snoop dog"];


    function renderScreen() {

        renderButtons();

        var gifDiv = $("<div>");
        gifDiv.attr("id", "gifDiv");
        $(".container").append(gifDiv);
    }   

    //this function will dynamically render buttons 
    function renderButtons() {

        $("#buttonDiv").empty();

        //dynamically create buttons based on the array 
        for(var i = 0; i < topicArray.length; i++) {
            var rapperButton = $("<button>");
            rapperButton.addClass("gifButton");
            rapperButton.addClass("btn btn-primary");
            rapperButton.attr("data-name", topicArray[i]);
            rapperButton.text(topicArray[i]);

            $("#buttonDiv").append(rapperButton);
        }
    }

    renderScreen();

    //when the buttons are clicked we will send an AJAX request to the Giphy API to load gifs onto our page based on which
    //button was clicked
    $(document.body).on("click", ".gifButton", function(){
        var rapper = $(this).attr("data-name");
        
        console.log(rapper);

        //build the queryURL based on which button was pressed
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + rapper + "&api_key=" + apiKey + "&limit=10&rating=g"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $("#gifDiv").empty();
            addGifs(response);
        });



    });

    //function that will create and add gifs
    function addGifs(response) {

        // var gifDiv = $("<div>");
        // gifDiv.attr("id", "gifDiv");

        for(var i = 0; i < response.data.length; i++) {
            var gifCard = $("<div>");
            gifCard.addClass("gifCard");

            var gifElement = $("<img>");
            gifElement.attr("src", response.data[i].images.fixed_height_still.url);
            gifElement.attr("data-still", response.data[i].images.fixed_height_still.url);
            gifElement.attr("data-animated", response.data[i].images.fixed_height.url);
            gifElement.attr("data-state", "still");
            gifElement.addClass("gif");

            var rating = $("<p>");
            rating.text("Rating: " + response.data[i].rating);
            rating.addClass("gifDescription");

            gifCard.append(gifElement).append(rating);

            $("#gifDiv").append(gifCard);
        }

        //$(".container").append(gifDiv);
    }

    $(document.body).on("click", ".gif", function(){

        var state = $(this).attr("data-state");

        console.log("being clicked");

        if(state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    //this is a click function that will add new buttons based on user input 
    $("#button-addon2").on("click", function(event){

        event.preventDefault();

        var rapperToAdd = $("#rapperInput").val();

        if(rapperToAdd !== "") {
            topicArray.push(rapperToAdd);
            renderButtons();
        }

    });

});