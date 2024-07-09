import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

const useAddKitchen = () => {
  const addKitchen = async (formData, user) => {
    try {
      const newKitchen = {
        title: formData.get("title"),
        image: formData.get("image"),
        cooking: formData.get("cookingTime"), // Renamed to cookingTime
        ingredients: JSON.parse(formData.get("ingredients")),
        method: formData.get("method"),
        ovqat: formData.get("ovqat"), // Include relatedDish field
        completed: formData.get("completed") === "on" ? true : false,
        uid: user.uid,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "kitchen"), newKitchen);
      toast.success("Yangi Oshxona muvaffaqiyatli qo'shildi");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      const kitchenRef = doc(db, "kitchen", id);
      await updateDoc(kitchenRef, {
        completed: !status,
      });
      toast.success("Holat o'zgardi");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { addKitchen, changeStatus };
};

export default useAddKitchen;
