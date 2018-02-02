// Constants will be in scope throughout the entire file.
const NUMBER_OF_NOTES = 7;
const FIRST_LETTER = 'a';

// Prevents the script from running before the DOM has loaded
window.onload = function() {
    var listener = new window.keypress.Listener();

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

    for (var i = 0; i < NUMBER_OF_NOTES; ++i) {
        currentNoteID = String.fromCharCode(charCode + i);

        var sounds = document.getElementById(currentNoteID + "Audio").getElementsByTagName('source');

        var noteObject = {
            title: currentNoteID,
            musicBox: document.getElementById(currentNoteID),
            audio: new Howl({
                src: [
                    sounds[0].src,
                    sounds[1].src,
                    sounds[2].src,
                ]
            })
        };

        notes.push(noteObject);
    }

    return notes;
}

function attachNoteListeners(notes) {
    // Iterates through the notes array with each element being
    // targeted by the element parameter
    notes.forEach((element, index) => {
        // Using an anonymous function as the callback to the listener
        // so that we can use the element parameter passed into forEach
        element.musicBox.addEventListener("click", (e) => {
            element.audio.play();
        });

    })
}
