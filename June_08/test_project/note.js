// Problem: We want to create a notes application, where we would pass the details via a command and then we would store them into a folder.
// we would also want to update a particular note, delete a node and get a node.
// CRUD operations: create, read , update and delete.

// Subproblem
// 1) We want to read a command. we would cross check npm and see if we can achieve this functionality. https://www.npmjs.com/package/args
// 2) we want some npm package to write the data into one file. https://www.npmjs.com/package/fs
// 3) We want to ensure that duplicate notes are not present. 
        // 3.1) we would get all the notes and check if the new requested note is already present, we would not create it.
        // 3.2) in case the note is not present, we would append the note into notes.txt file.
// 4) we want to update the note also. We would take title and description as inputs. we would update the note description having the title which is passed.
//5) we would delete the note based on the title which is being passed in command.
const yargs = require("yargs");
// node note.js create --title="" --description=""

yargs.command({
    command: 'create',
    describe: "This command creates a new note",
    builder: {
        title: {
            type: 'string',
            describe: 'This argument is required with create command to specify the title of note',
            demandOption: true
        },
        description: {
            type: 'string',
            describe: 'This argument is required with create command to specify the description of note',
            demandOption: true
        }   
    },
    handler: function (argv) {
        console.log("inside", argv.title, argv.description)
    }
})
.argv


// yargs.command()
// console.log(yargs.argv)

