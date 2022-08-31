'use strict';
const yargs = require('yargs');     // yargs module
const notes = require('./notes.js');    // notes module

yargs.command({     // add a new note
    command: 'add',
    describe: 'add new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,  // by default the title is not required but we can change it by setting its value to true
            type: 'string'  // by default value is boolean
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
});

yargs.command({     // remove a note
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { // handler is a function that will be executed when the command is called
        notes.removeNotes(argv.title);
    }
});

yargs.command({    // list all notes
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes();
    }
});

yargs.command({   // read a note
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { // handler is a function that will be executed when the command is called
        notes.readNote(argv.title);
    }
});

yargs.parse();  // parse the arguments and execute the command that is called
