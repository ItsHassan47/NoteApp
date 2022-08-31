'use strict'
const fs = require('fs');    // file system module
const chalk = require('chalk');   // chalk module


const addNotes = (title, body) => {     // add a new note
    const notes = loadNotes();  // load notes from file
    const dulpicateNote = notes.find((note) => note.title === title);   // find the duplicate note

    if (!dulpicateNote) {   // if the note is not a duplicate
        notes.push({    // push the note to the array
            title: title,
            body: body
        });
        saveNotes(notes);   // save the notes to file
        console.log(chalk.green.bold('New note added!'));   // print a message
    } else {    // if the note is found
        console.log(chalk.red.bold('Note title taken!'));   // print a message
    }
}

const removeNotes = (title) => {    // remove a note
    const notes = loadNotes();  // load notes from file
    const notesToKeep = notes.filter((note) => note.title !== title);   // filter out the note that we want to remove from the array
    if (notes.length > notesToKeep.length) {    // if the length of the notes after filtering is greater than the length of the notes before filtering
        console.log(chalk.green.bold('Note removed!')); // print a message
        saveNotes(notesToKeep);  // save the notes to file
    } else {     // if the length of the notes after filtering is not greater than the length of the notes before filtering
        console.log(chalk.red.bold('No note found!'));  // print a message
    }
}

const saveNotes = (notes) => {      // save notes to file
    const dataJSON = JSON.stringify(notes); // convert the notes to JSON
    fs.writeFileSync('notes.json', dataJSON);   // write the JSON to the file
}

const loadNotes = () => {       // load notes from file
    try {                      // try to read the file
        const data = (fs.readFileSync('notes.json')).toString();    // read the file and convert it to string
        return JSON.parse(data);    // parse the string to JSON
    } catch (ex) {            // if the file is not found
        return [];           // return an empty array
    }
}

const listNotes = () => {       // list all notes
    const notes = loadNotes();  // load notes from file
    console.log(chalk.inverse('Your notes'));   // print a message

    notes.forEach((note) => {   // for each note in the array
        console.log(note.title);    // print the title
    });
}

const readNote = (title) => {       // read a note
    const notes = loadNotes();  // load notes from file
    notes.find((note) => {  // find the note that we want to read
        if (note.title == title) {  // if the title of the note is the same as the title that we want to read
            console.log(chalk.green.inverse(note.title), note.body);    // print the title and the body of the note
        } else {    // if the title of the note is not the same as the title that we want to read
            console.log(chalk.red.inverse('Note not found'));   // print a message
        }
    });
}

module.exports = {      // export the functions
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}
