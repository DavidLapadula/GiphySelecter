$( document ).ready(function() {
  
    //Selectors 
    var buttonsDiv = $("#buttons-div"); 
    var addedGifs = $("#added-gifs"); 
    var newButtonGif = $("#add-gif-button"); 
    var gifInputField = $("#add-gif-input");  
    var resetMood = $("#reset-mood");  
    var mainHeaderText = $("#main-header");  
     
    // Global Variables 
    var buttonStyle = "gif-button"; 
    var imageStyle = "added-image";
    var buttonValue;    
    var startingEmotions;
    var addedEmotions; 
    var allEmotions; 

    //Set the object and variables to build the API key for requests
    var queryURL = "https://api.giphy.com/v1/gifs/search?";  
    var queryParameters = {"api_key": "nHBumPbWahGsvmlTe7EP1iepLbvF1Upi"};
    var emotions =  { 
        starting: ["SAD", "HAPPY", "TIRED", "ANGRY", "HUNGRY"], 
        added: []
    }  

    // <----------- Application functionality --------------> //
    
    // Sets arrays to local storage if its the first time using application or local storage has been cleared 
    if (localStorage.getItem('startingEmotions') === null) {
        localStorage.setItem('startingEmotions', emotions.starting)
        localStorage.setItem('addedEmotions', emotions.added)
    }
 
    // Function that makes buttons based on whatever is on local storage
    var makeButtons = function () {
        startingEmotions = localStorage.getItem('startingEmotions'); 
        addedEmotions = localStorage.getItem('addedEmotions');
        startingEmotionsArray = startingEmotions.split(','); 
        addedEmotionsArray = addedEmotions.split(',');  
        allEmotions = startingEmotionsArray.concat(addedEmotionsArray);   
            for (let i = 0; i < allEmotions.length; i++) {
                if (allEmotions[i] === '') { continue; }  
                newEmotionButton = $(`<button>${allEmotions[i]}</button>`);  
                newEmotionButton.attr({class:buttonStyle});  
                buttonsDiv.append(newEmotionButton);    
        }  
 
    }   

    // First call to the functions to populate the buttons when the page loads
    makeButtons();  

    // Function that queries the Giphy API
    function generateQuery (queryVal, queryAmount) {
        queryParameters.q = queryVal; 
        queryParameters.limit = queryAmount;
        newQuery =  queryURL + $.param(queryParameters); 
        return newQuery;    
    }     
    
    // Function that populates the Gif images section 
    function populateGifImages (queryArray){
        for (var i = 0; i < queryArray.data.length; i++) {  
        newImageDiv = $('<div></div>').addClass(imageStyle)
        newGifRating = $(`<h3> Rating: ${queryArray.data[i].rating}</h3>`).addClass('heading-margin');   
        newImageEl = $('<img>'); 
        newImageEl.attr({'data-still': queryArray.data[i].images.original_still.url, 'data-animate':queryArray.data[i].images.original.url, 'data-state': 'pause', class: 'retrieved-image'}); 
        newImageEl.attr('src',  queryArray.data[i].images.original_still.url);  
        newImageDiv.append(newImageEl, newGifRating); 
        addedGifs.append(newImageDiv);      
        mainHeaderText.text(`Current Emotion: ${buttonValue.toUpperCase()}`) 
        }   
      
    }          
   
    // Button for adding new emotions
    $(newButtonGif).on('click', function () { 
        dynamicButton = gifInputField.val().trim().toUpperCase();  
        if (!gifInputField.val()) {
            alert("Type an emotion first!");
        } else if  (allEmotions.includes(dynamicButton)) {  
            alert("You already have that one!"); 
        } else { 
        $('.gif-button').remove(); 
        emotions.added.push(dynamicButton);  
        localStorage.setItem('addedEmotions', emotions.added);  
        makeButtons(); 
        }   
        gifInputField.val('').attr("placeholder", "I feel...")
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
    buttonsDiv.on('click', '.gif-button', function (event) {
        event.preventDefault(); 
        addedGifs.empty();  
        buttonValue = this.innerText.toLowerCase(); 
        generateQuery (buttonValue, 10);     
        $.ajax({    
            url: newQuery,     
            method: "GET"
        }).then(populateGifImages);    
    });  

    //Resets the images and buttons to the original state when the page loaded
    resetMood.on('click', function () {
        event.preventDefault();
        $('.gif-button').remove(); 
        addedGifs.empty();  
        mainHeaderText.text('Mood GIF\'s'); 
        emotions.added = [];  
        localStorage.setItem('addedEmotions', emotions.added)
        makeButtons();
    });   
    
});     