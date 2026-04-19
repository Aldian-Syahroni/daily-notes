import List "mo:core/List";
import Types "types/notes";
import NotesApi "mixins/notes-api";

actor {
  let notes = List.empty<Types.Note>();
  let counter = { var val : Nat = 0 };

  include NotesApi(notes, counter);
};
