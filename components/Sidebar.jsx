import React from "react";

export default function Sidebar(props) {
    const noteElements = props.notes.map(note => (
        <div key={note.id}>
            <div
                className={`title ${note.id === props.currentNote.id ? "selected-note" : ""}`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button 
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ));

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
            <h3>
  <img src="Images/circle.png" alt="Notes Icon" class="avatar" />
  Notes
</h3>

                <button className="new-note" onClick={props.newNote}>
                <img src={`${import.meta.env.BASE_URL}Images/clipboard2-data.svg`} alt="Notes Icon" />

                </button>
            </div>
            {noteElements}
        </section>
    );
}
