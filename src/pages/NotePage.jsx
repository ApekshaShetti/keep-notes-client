import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { api } from "../utils/axios";

const NotePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  let noteID = params.id;
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote(noteID);
  }, [noteID]);

  // 1
  async function getNote(noteID) {
    if (noteID === "new") return;
    const { data } = await api.get(`/myquicknotes/notes/${noteID}/`);

    setNote(data);
  }
  // 2
  // async function getNote(noteID) {
  //   let response = await fetch(
  //     `myquicknotes/notes/${noteID}/`
  //   );
  //   let data = await response.json();
  //   setNote(data);
  // }

  // 3
  // const getNote = async () => {
  //   let response = await fetch(
  //     `/myquicknotes/notes/${noteID}/`
  //   );
  //   let data = await response.json();
  //   setNote(data);
  // };

  async function updateNote(noteID) {
    await api.put(`/myquicknotes/notes/${noteID}/update`, note);
    navigate("/");
  }

  async function createNote() {
    await api.post(`/myquicknotes/notes/create`, note);
    navigate("/");
  }

  async function deleteNote(noteID) {
    await api.delete(`/myquicknotes/notes/${noteID}/delete`);
    navigate("/");
  }

  const handleSubmit = (noteID) => {
    if (noteID === "new") {
      if (note?.body.length) {
        createNote();
      }
    } else {
      if (note.body.length) {
        updateNote(noteID);
      } else {
        deleteNote(noteID);
      }
    }
    navigate("/");
  };

  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <MdArrowBackIosNew onClick={() => handleSubmit(noteID)} />
        </h3>
        {noteID !== "new" ? (
          <button onClick={() => deleteNote(noteID)}>Delete</button>
        ) : (
          <button onClick={createNote}>Create</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body ?? ""}
      ></textarea>
    </div>
  );
};

export default NotePage;
