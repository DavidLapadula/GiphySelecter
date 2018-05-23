$( document ).ready(function() {
 
    //Selectors 
    var buttonsDiv = $("#buttons-div"); 
    var addedGifs = $("#added-gifs"); 
    var newButtonGif = $("#add-gif-button"); 
    var gifInputField = $("#add-gif-input");  
    
    // Global Variables and Game Markers
    var buttonStyle = "gif-button"; 
    var imageStyle = "added-image";   

    //Set the object and variables to build the API key for requests
    var queryURL = "https://api.giphy.com/v1/gifs/search?";  
    var queryParameters = {"api_key": "nHBumPbWahGsvmlTe7EP1iepLbvF1Upi"};
    var startingEmotions =  ["HAPPY", "SAD", "TIRED", "ANGRY", "HUNGRY"]; 

    // <----------- Application functionality --------------> //
        
    // Loop that generates the array that makes the buttons for adding emotion gifs
    for (let i = 0; i < startingEmotions.length; i++) {
        newEmotionButton = $(`<button>${startingEmotions[i]}</button>`);  
        newEmotionButton.attr({class:buttonStyle, id: 'button-' + startingEmotions[i]});  
        buttonsDiv.append(newEmotionButton);    
    }     
    
    // Function that queries the Giphy API
    function generateQuery (queryVal, queryAmount) {
        queryParameters.q = queryVal; 
        queryParameters.limit = queryAmount;
        newQuery =  queryURL + $.param(queryParameters); 
        return newQuery;    
    }     
    
    // Function that populates favorites Section 
    function populateGifImages (queryArray){
        for (var i = 0; i < queryArray.data.length; i++) {  
        newImageDiv = $('<div></div>').addClass(imageStyle)
        newGifRating = $(`<h3> Rating: ${queryArray.data[i].rating}</h3>`).addClass('heading-margin');   
        newImageEl = $('<img>'); 
        newImageEl.attr({'data-still': queryArray.data[i].images.original_still.url, 'data-animate':queryArray.data[i].images.original.url, 'data-state': 'pause', class: 'retrieved-image'}); 
        newImageEl.attr('src',  queryArray.data[i].images.original_still.url);  
        newImageDiv.append(newImageEl, newGifRating); 
        addedGifs.append(newImageDiv);      
        }   
    
    }         

    // Button for adding new emotions
    $(newButtonGif).on('click', function () { 
        if (!gifInputField.val()) {
            alert("Type an emotion first!");
        } else { 
        dynamicButton = $(`<button>${gifInputField.val().trim().toUpperCase()}</button>`);  
        dynamicButton.attr({class:buttonStyle, id: 'button-' + gifInputField.val().trim()});    
        buttonsDiv.append(dynamicButton);   
        }   
        gifInputField.val('').attr("placeholder", "Add emotion...")
    }); 
    
    //Button for pausing and playing each gif
    $(addedGifs).on('click', '.retrieved-image' , function () {
        clickedGif = $(this);  
        if (clickedGif.data('state') === 'pause') {  
            animatedSrc = clickedGif.data('animate'); 
            clickedGif[0].src = animatedSrc;  
            clickedGif.data('state', 'animate'); 
        }  else if (clickedGif.data('state') === 'animate') {
            animatedSrc = clickedGif.data('still'); 
            clickedGif[0].src = animatedSrc;  
            clickedGif.data('state', 'pause');  
        } 
    }); 
    
    // Register click event on emotions button for API query
    buttonsDiv.on('click', 'button', function (event) {
        event.preventDefault(); 
        addedGifs.empty();  
        buttonValue = this.innerText.toLowerCase(); 
        generateQuery (buttonValue, 10);    
        $.ajax({   
            url: newQuery,     
            method: "GET"
        }).then(populateGifImages);  
    });  
    
});   
