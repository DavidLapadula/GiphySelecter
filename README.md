# Giphy API Query

## Description
This is a simple 'Gif' searching application - users visiting the page can click predefined buttons to view static images (which turn to gifs once clicked) and add mood selector buttons with a simple submission form. 

## Screenshots

![](./assets/images/giphyAPI.gif)

## Motivation
This project was used to practice implementing basic API calls and rendering the data. Since so many web applications require gathering data from an external source, understanding asychronous javascript requests (and, by extension, promises) is essential. I also had the chance to utilize 'local storage' functions for interacting with browser memory. This facilitated storing user choices between sessions and provided an excellent introduction to data persistency. 

## Technology Used
* HTML
* CSS
* Javascript
* Jquery
* AJAX used to query the GIPHY API
* Local Storage used to save the user's 'favourited' mood buttons


## Resolutions
I wanted to add a feature to this program that would allow users to store their favourite mood selectors for later use. I accomplished this by storing the value of 'favorited' selectors in local storage, and then pulling the data (in JSON format) from there when the user loaded the browser
 
## Instructions
* Click a mood button and watch the screen populate with 10 static Gif's
* Click the GIF to animate it
* Use the submission bar in the upper right hand corner to add your favourite moods
 
[Play it here](https://davidlapadula.github.io/Week-6-API/)
