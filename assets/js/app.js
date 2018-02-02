// Constants will be in scope throughout the entire file.
const NUMBER_OF_NOTES = 7;
const FIRST_LETTER = 'a';

// Prevents the script from running before the DOM has loaded
window.onload = function() {
    var notes = getAllNoteElements();

    attachNoteListeners(notes);
}


/***********************
Functions!
***********************/

/**
 * Returns all of the elements that have ID's matching the selected
 * range of letters (in our case, notes)
 *
 * @return {Array} An array of all the music box elements in the DOM
 */
function getAllNoteElements() {
    var notes = [];
    var currentNoteID = null;
    var charCode = FIRST_LETTER.charCodeAt(0);

    // This will return an HTMLCollection of all the elements in the
    // DOM with the class name "music-box"
    var elements = document.getElementsByClassName("music-box");

    // Since an HTMLCollection is an array-LIKE structure, but not an
    // array, we have to make an array from elements in order to iterate
    // over it with a .forEach()
    Array.from(elements).forEach((element) => {

        // This gets each of the groups of sound files and puts them
        // into an array
        var sounds = document.getElementById(element.id + "Audio")
            .getElementsByTagName("source");

        // We're combining all of the information for each note into an
        // object so we can have a little more sanity with how we're
        // storing all of our data!
        var noteObject = {
            title: element.id,
            musicBox: element,
            audio: new Howl({
                src: [
                    sounds[0].src,
                    sounds[1].src,
                    sounds[2].src,
                ]
            })
        }

        notes.push(noteObject);
    });

    return notes;
}

/**
 * Iterates through notes and attaches a "click" listener
 * that plays the appropriate sound when the note box is
 * clicked.
 *
 * @param  {Array} notes An array of all the note elements
 */
function attachNoteListeners(notes) {
    // Iterates through the notes array with each element being
    // targeted by the element parameter
    notes.forEach((element) => {
        // Using an anonymous function as the callback to the listener
        // so that we can use the element parameter passed into forEach
        element.musicBox.addEventListener("click", (e) => {
            element.audio.play();
        });
    })
}
