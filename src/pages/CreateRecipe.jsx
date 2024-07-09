import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import useAddKitchen from "../hooks/useAddKitchen";
import { FormInput, Modal } from "../components";
import toast from "react-hot-toast";
import Pie from "../components/Pie";

function CreateRecipe() {
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection(
    "kitchen",
    ["uid", "==", user.uid],
    ["createdAt"]
  );
  const { addKitchen } = useAddKitchen();

  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [method, setMethod] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredientCounts, setIngredientCounts] = useState({}); // Default empty object

  // Ingredients o'zgaruvchisi o'zgarganda ingredientCounts ni yangilash
  useEffect(() => {
    const counts = {};
    ingredients.forEach((ing) => {
      counts[ing] = counts[ing] ? counts[ing] + 1 : 1;
    });
    setIngredientCounts(counts);
  }, [ingredients]);

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleIngredientChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient("");
    }
  };

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      formData.append("image", imageUrl);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("method", method);
      formData.append("ovqat", formData.get("ovqat")); // Add related dish to form data

      await addKitchen(formData, user);

      toast.success("Oshxona muvaffaqiyatli qo'shildi!");
    } catch (error) {
      console.error("Oshxona qo'shishda xatolik:", error);
      toast.error("Oshxona qo'shilmadi");
    }
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="w-auto">
      <div className=" p-8 max-w-7xl w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full gap-5"
        >
          <h2 className="text-3xl font-semibold">Add New Recipe</h2>

          <FormInput
            className="max-w-md w-full"
            name="title"
            type="text"
            label="Title"
          />

          <FormInput
            className="w-full max-w-md"
            name="ovqat"
            type="text"
            label="Notion"
          />
          <FormInput
            className="w-full max-w-md"
            name="cookingTime"
            type="text"
            label="Cooking time"
          />
          <FormInput
            className="w-full max-w-md"
            name="image"
            type="url"
            label="Image URL"
            onChange={handleImageChange}
          />
          {imageUrl && (
            <div className="w-full max-w-md mt-4 items-center flex flex-col">
              <img
                src={imageUrl}
                alt="Oshxona rasmi"
                className="w-40 h-40 object-cover"
              />
            </div>
          )}

          <div className="w-full max-w-md flex items-center">
            <input
              type="text"
              value={ingredient}
              onChange={handleIngredientChange}
              placeholder="Enter ingredients of meal"
              className="flex-grow px-4 py-2 border rounded w-full max-w-md"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="ml-2 px-4 py-2 bg-primary text-white rounded"
            >
              +
            </button>
          </div>
          <div className="w-full max-w-xs mt-2">
            {ingredients.length === 0 ? (
              <p>No ingredients yet</p>
            ) : (
              ingredients.map((ing, index) => (
                <span key={index} className="block mb-1">
                  {ing}
                </span>
              ))
            )}
          </div>

          <div className="w-full max-w-md">
            <label htmlFor="method" className="block mb-2">
              Method:
            </label>
            <textarea
              id="method"
              name="method"
              value={method}
              onChange={handleMethodChange}
              placeholder="Enter method of meal"
              className="w-full py-2 border rounded"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="btn bg-primary w-40 text-white py-2 px-4 rounded-lg"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={handlePreview}
              className="btn bg-secondary w-40 text-white py-2 px-4 rounded-lg"
            >
              Preview
            </button>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <Modal
          title="Recipe Preview"
          imageUrl={imageUrl}
          ingredients={ingredients}
          method={method}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Pie komponentini qo'shish */}
      <div className="w-auto">
        <h2 className="text-3xl font-semibold">Ingredients Pie Chart</h2>
        {Object.keys(ingredientCounts).length > 0 ? (
          <Pie data={ingredientCounts} />
        ) : (
          <p>No ingredients added yet</p>
        )}
      </div>
    </div>
  );
}

export default CreateRecipe;
