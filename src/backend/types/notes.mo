module {
  public type NoteId = Nat;

  public type Note = {
    id : NoteId;
    title : Text;
    content : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  public type NoteInput = {
    title : Text;
    content : Text;
  };

  public type NoteUpdate = {
    id : NoteId;
    title : Text;
    content : Text;
  };
};
