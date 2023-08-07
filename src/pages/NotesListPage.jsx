import { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";
import { api } from "../utils/axios";

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getNotes()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  let getNotes = async () => {
    let response = await api.get("/myquicknotes/notes/");
    // let data = await response.json();
    setNotes(response.data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Quick Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          notes.map((note, index) => <ListItem key={index} note={note} />)
        )}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
