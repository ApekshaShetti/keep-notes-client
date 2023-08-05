import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const AddButton = () => {
  return (
    <Link to="/note/new" className="floating-button">
      <AiOutlinePlus />
    </Link>
  );
};

export default AddButton;
