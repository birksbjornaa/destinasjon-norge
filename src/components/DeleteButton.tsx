import React from "react";
import { deleteDestination } from "../controllers/fierbaseController"; 
import { useNavigate } from "react-router-dom";

interface DeleteButtonProps {
  destinationId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ destinationId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this destination?");
    if (confirmDelete) {
      try {
        await deleteDestination(destinationId);
        alert("Destination deleted successfully!"); 
        navigate("/");
      } catch (error) {
        console.error("Error deleting destination:", error);
        alert("Failed to delete destination. Please try again later."); 
      }
    }
  };

  return (
    <button id = "delete" onClick={handleDelete}>Slett destinasjon</button>
  );
};

export default DeleteButton;
