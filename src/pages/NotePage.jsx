import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdArrowBackIosNew } from "react-icons/md";

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
    const { data } = await axios.get(
      `http://localhost:8000/myquicknotes/notes/${noteID}/`
    );

    setNote(data);
  }
  // 2
  // async function getNote(noteID) {
  //   let response = await fetch(
  //     `http://localhost:8000/myquicknotes/notes/${noteID}/`
  //   );
  //   let data = await response.json();
  //   setNote(data);
  // }

  // 3
  // const getNote = async () => {
  //   let response = await fetch(
  //     `http://localhost:8000/myquicknotes/notes/${noteID}/`
  //   );
  //   let data = await response.json();
  //   setNote(data);
  // };

  async function updateNote(noteID) {
    axios.put(
      `http://localhost:8000/myquicknotes/notes/${noteID}/update`,
      note
    );
    navigate("/");
  }

  async function deleteNote(noteID) {
    axios.delete(`http://localhost:8000/myquicknotes/notes/${noteID}/delete`);
    navigate("/");
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <MdArrowBackIosNew onClick={() => updateNote(noteID)} />
        </h3>
        <button onClick={() => deleteNote(noteID)}>Delete</button>
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        defaultValue={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
