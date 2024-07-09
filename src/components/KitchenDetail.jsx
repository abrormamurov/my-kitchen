import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function KitchenDetail() {
  const { id } = useParams();
  const [kitchen, setKitchen] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!kitchen) {
    return <div>Kitchen not found</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{kitchen.title}</h1>
      <div className="carousel relative overflow-hidden mb-4">
        {kitchen.images && kitchen.images.length > 0 ? (
          kitchen.images.map((image, index) => (
            <div
              id={`item${index}`}
              className="carousel-item w-full absolute"
              key={index}
            >
              <img src={image} alt={`Slide ${index}`} className="w-full" />
            </div>
          ))
        ) : (
          <div id="item0" className="carousel-item w-full absolute">
            <img src={kitchen.image} alt={kitchen.title} className="w-full" />
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
      <h2 className="text-2xl font-semibold mb-2">Method</h2>
      <p className="mb-4">{kitchen.method}</p>
      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside">
        {kitchen.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

export default KitchenDetail;
