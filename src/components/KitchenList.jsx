import React from "react";
import toast from "react-hot-toast";
import { db } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

function KitchenList({ kitchen }) {
  const deleteKitchen = (id) => {
    deleteDoc(doc(db, "kitchen", id))
      .then(() => {
        toast.success("O'chirildi");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <li
      key={kitchen.id}
      className="flex flex-col gap-4 mb-4 p-8 border rounded card glass w-auto"
    >
      <div className="flex justify-end">
        <HiX className="musir" onClick={() => deleteKitchen(kitchen.id)} />
      </div>

      <Link to={`/kitchen/${kitchen.id}`}>
        <div>
          <h3 className="font-bold text-3xl">{kitchen.title}</h3>

          <h4 className="font-bold">Method:</h4>
          <div className="relative">
            <p className="max-h-24 overflow-auto pr-4">{kitchen.method}</p>
            <div className="absolute top-0 right-0 h-full w-2 bg-transparent"></div>
          </div>
        </div>
        <div className="flex gap-3 mb-3 justify-end">
          <p className="soat2 w-24">! NEW</p>
          <p className="soat w-32">⌚️ {kitchen.cooking} minutes</p>
        </div>
        {/* <div>
          <h4 className="font-bold">Ingredients:</h4>
          {kitchen.ingredients && kitchen.ingredients.length > 0 ? (
            <ul className="list-disc list-inside flex gap-3">
              {kitchen.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          ) : (
            <p>No ingredients</p>
          )}
        </div> */}

        <figure>
          {kitchen.image && (
            <img src={kitchen.image} alt={kitchen.title} className="max-w-md" />
          )}
        </figure>
      </Link>
    </li>
  );
}

export default KitchenList;
