import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { KitchenList } from "../components"; // Adjust component import based on your setup
import { Link } from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.user);
  const { data, isLoading, error } = useCollection(
    "kitchen",
    ["uid", "==", user.uid],
    ["createdAt"]
  );

  useEffect(() => {
    // Optionally fetch data here if not already fetched
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="align-element">
      <h2 className="font-bold text-3xl mt-10 mb-5">Recipes</h2>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((kitchen) => (
            <KitchenList key={kitchen.id} kitchen={kitchen} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10 mb-20">
          <p className="mb-4">No recipes found. Do you want to create one?</p>
          <Link to="/recipe" className="btn glass mb-96">
            Create Recipe
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
