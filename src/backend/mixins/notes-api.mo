import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/notes";
import NotesLib "../lib/notes";

mixin (
  notes : List.List<Types.Note>,
  counter : { var val : Nat },
) {
  /// Create a new note. Returns the created note.
  public shared func createNote(input : Types.NoteInput) : async Types.Note {
    let note = NotesLib.createNote(notes, counter.val, input, Time.now());
    counter.val += 1;
    note;
  };

  /// List all notes, newest first.
  public query func listNotes() : async [Types.Note] {
    NotesLib.listNotes(notes);
  };

  /// Get a single note by id.
  public query func getNote(id : Types.NoteId) : async ?Types.Note {
    NotesLib.getNote(notes, id);
  };

  /// Update a note's title and content.
  public shared func updateNote(upd : Types.NoteUpdate) : async ?Types.Note {
    NotesLib.updateNote(notes, upd, Time.now());
  };

  /// Delete a note by id. Returns true if deleted.
  public shared func deleteNote(id : Types.NoteId) : async Bool {
    NotesLib.deleteNote(notes, id);
  };

  /// Search notes by title or content text.
  public query func searchNotes(searchTerm : Text) : async [Types.Note] {
    NotesLib.searchNotes(notes, searchTerm);
  };
};
