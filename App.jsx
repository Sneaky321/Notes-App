import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
    const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || []);
    const [currentNoteId, setCurrentNoteId] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    async function createNewNote() {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
        
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        };
        setNotes(prevNotes => [newNote, ...prevNotes]);
        setCurrentNoteId(newNote.id);
        setLoading(false);
    }

    function updateNote(text) {
        setNotes(oldNotes => {
            return oldNotes.map(note =>
                note.id === currentNoteId ? { ...note, body: text } : note
            );
        });
    }

    function deleteNote(event, noteId) {
        event.stopPropagation();
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId));
    }

    function findCurrentNote() {
        return notes.find(note => note.id === currentNoteId) || notes[0];
    }

    return (
        <main>
            {
                notes.length > 0 ?
                <Split sizes={[30, 70]} direction="horizontal" className="split">
                    <Sidebar
                        notes={notes}
                        currentNote={findCurrentNote()}
                        setCurrentNoteId={setCurrentNoteId}
                        newNote={createNewNote}
                        deleteNote={deleteNote}
                        loading={loading}
                    />
                    <Editor
                        currentNote={findCurrentNote()}
                        updateNote={updateNote}
                    />
                </Split>
                :
                <div className="no-notes">
                    <h1>You have no notes</h1>
                    <button className="first-note" onClick={createNewNote}>
                        Create one now
                    </button>
                </div>
            }
        </main>
    );
}
