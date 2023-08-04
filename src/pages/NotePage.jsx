import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { MdArrowBackIosNew } from "react-icons/md";


const NotePage = () => {
  const params = useParams();
  let noteID = params.id;
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote(noteID);
  }, [noteID]);

  async function getNote(noteID) {
    const { data } = await axios.get(
      `http://localhost:8000/myquicknotes/notes/${noteID}/`
    );

    setNote(data);
  }
  // async function getNote(noteID) {
  //   let response = await fetch(
  //     `http://localhost:8000/myquicknotes/notes/${noteID}/`
  //   );
  //   let data = await response.json();
  //   setNote(data);
  // }

  // const getNote = async () => {
  //   let response = await fetch(
  //     `http://localhost:8000/myquicknotes/notes/${noteID}/`
  //   );
  //   let data = await response.json();
  //   setNote(data);
  // };

  return (
    <div className="note">
      <div className="note-header">
      <h3>
          <Link to={"/"}>
            <MdArrowBackIosNew />
          </Link>
        </h3>

      </div>
      <textarea defaultValue={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
