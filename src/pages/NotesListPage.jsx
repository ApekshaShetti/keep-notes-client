import { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";
import { api } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email, username } = JSON.parse(localStorage.getItem("user"));
  // const email = user.email;

  useEffect(() => {
    setLoading(true);
    getNotes()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  let getNotes = async () => {
    let response = await api.get(`/myquicknotes/notes/${email}/all`);
    // let data = await response.json();
    setNotes(response.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Quick Notes</h2>
        {/* <p className="notes-count">{notes.length}</p> */}
        <div className="logout">
          <div onClick={handleLogout}>
            {username}
            <RiLogoutBoxRLine style={{ width: 20, height: 20 }} />
          </div>
        </div>
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
