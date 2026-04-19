import List "mo:core/List";
import Int "mo:core/Int";
import Types "../types/notes";

module {
  public type Note = Types.Note;
  public type NoteId = Types.NoteId;
  public type NoteInput = Types.NoteInput;
  public type NoteUpdate = Types.NoteUpdate;

  /// Create a new note and add it to the list. Returns the new note.
  public func createNote(
    notes : List.List<Note>,
    nextId : Nat,
    input : NoteInput,
    now : Int,
  ) : Note {
    let note : Note = {
      id = nextId;
      title = input.title;
      content = input.content;
      createdAt = now;
      updatedAt = now;
    };
    notes.add(note);
    note;
  };

  /// Return all notes sorted newest first (by createdAt descending).
  public func listNotes(notes : List.List<Note>) : [Note] {
    let arr = notes.toArray();
    arr.sort(func(a, b) = Int.compare(b.createdAt, a.createdAt));
  };

  /// Return a single note by id, or null if not found.
  public func getNote(notes : List.List<Note>, id : NoteId) : ?Note {
    notes.find(func(n) { n.id == id });
  };

  /// Update title and content of an existing note. Returns the updated note or null if not found.
  public func updateNote(
    notes : List.List<Note>,
    upd : NoteUpdate,
    now : Int,
  ) : ?Note {
    var updated : ?Note = null;
    notes.mapInPlace(func(n) {
      if (n.id == upd.id) {
        let newNote = { n with title = upd.title; content = upd.content; updatedAt = now };
        updated := ?newNote;
        newNote;
      } else {
        n;
      };
    });
    updated;
  };

  /// Delete a note by id. Returns true if deleted, false if not found.
  public func deleteNote(notes : List.List<Note>, id : NoteId) : Bool {
    let sizeBefore = notes.size();
    let filtered = notes.filter(func(n) { n.id != id });
    notes.clear();
    notes.append(filtered);
    notes.size() < sizeBefore;
  };

  /// Search notes whose title or content contains the query (case-insensitive).
  public func searchNotes(notes : List.List<Note>, searchTerm : Text) : [Note] {
    let term = searchTerm.toLower();
    let matched = notes.filter(func(n) {
      n.title.toLower().contains(#text term) or n.content.toLower().contains(#text term);
    });
    let arr = matched.toArray();
    arr.sort(func(a, b) = Int.compare(b.createdAt, a.createdAt));
  };
};
