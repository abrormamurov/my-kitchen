import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { addItemToBasket } from "./basketSlice";

function KitchenDetail() {
  const { id } = useParams();
  const [kitchen, setKitchen] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchKitchen = async () => {
      try {
        const docRef = doc(db, "kitchen", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setKitchen(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKitchen();
  }, [id]);

  const handleAddToBasket = () => {
    dispatch(addItemToBasket(kitchen));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!kitchen) {
    return <div>Kitchen not found</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{kitchen.title}</h1>
      <div className="flex gap-40">
        <div>
          <div className="  overflow-hidden mb-4">
            {kitchen.images && kitchen.images.length > 0 ? (
              kitchen.images.map((image, index) => (
                <div id={`item${index}`} className=" w-20 " key={index}>
                  <img src={image} alt={`Slide ${index}`} className="w-20" />
                </div>
              ))
            ) : (
              <div id="item0" className=" w-80 ">
                <img src={kitchen.image} alt={kitchen.title} className="w-80" />
              </div>
            )}
          </div>
          <div className="flex justify-center w-full py-2 gap-2">
            {kitchen.images && kitchen.images.length > 0 ? (
              kitchen.images.map((_, index) => (
                <a key={index} href={`#item${index}`} className="btn btn-xs">
                  {index + 1}
                </a>
              ))
            ) : (
              <a href="#item0" className="btn btn-xs">
                1
              </a>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Method</h2>
          <p className="mb-4">{kitchen.method}</p>
        </div>
        <div>
          {" "}
          <p className="mb-4">{kitchen.cooking}</p>
          <p className="mb-4">{kitchen.ovqat}</p>
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside flex gap-3">
            {kitchen.ingredients.map((ingredient, index) => (
              <li
                className="block mb-1 bg-gray-200 border-10 pb-1 border-gray-300 pl-4 pr-4 rounded-lg"
                key={index}
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="btn btn-primary mt-4" onClick={handleAddToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

export default KitchenDetail;
