import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NotePage = () => {
  const params = useParams();
  let noteID = params.id;
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote(noteID);
  }, [noteID]);

  async function getNote(noteID) {
    const {data} = await axios.get(
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
    <div>
      <p>{note?.body}</p>
    </div>
  );
};

export default NotePage;
