import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import useAddKitchen from "../hooks/useAddKitchen";
import { FormInput, Modal } from "../components";
import toast from "react-hot-toast";
// import { useHistory } from "react-router-dom";
import Pie from "../components/Pie";

function CreateRecipe() {
  // const history = useHistory();
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
  const [ingredientCounts, setIngredientCounts] = useState({});
  const [errorStatus, setErrorStatus] = useState({
    title: false,
    ovqat: false,
    cookingTime: false,
    image: false,
    method: false,
    ingredients: false,
  });

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

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const ovqat = formData.get("ovqat");
    const cookingTime = formData.get("cookingTime");
    const image = formData.get("image");
    const methodValue = method;

    const newErrorStatus = {
      title: !title,
      ovqat: !ovqat,
      cookingTime: !cookingTime,
      image: !image,
      method: !methodValue,
      ingredients: ingredients.length === 0,
    };

    setErrorStatus(newErrorStatus);

    const hasError = Object.values(newErrorStatus).some((status) => status);

    if (hasError) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    try {
      formData.append("image", imageUrl);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("method", methodValue);
      formData.append("ovqat", ovqat);

      await addKitchen(formData, user);
      toast.success("Oshxona muvaffaqiyatli qo'shildi!");

      // Redirect to home page after successful submission
      // history.push("/");
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
    <div className="w-auto flex flex-col items-center">
      <div className="p-8 max-w-7xl w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full gap-5"
        >
          <h2 className="text-3xl font-semibold">Add New Recipe</h2>

          <FormInput
            className={`max-w-md w-full ${
              errorStatus.title ? "input-error" : ""
            }`}
            name="title"
            type="text"
            label="Title"
          />
          <FormInput
            className={`w-full max-w-md ${
              errorStatus.ovqat ? "input-error" : ""
            }`}
            name="ovqat"
            type="text"
            label="Notion"
          />
          <FormInput
            className={`w-full max-w-md ${
              errorStatus.cookingTime ? "input-error" : ""
            }`}
            name="cookingTime"
            type="text"
            label="Cooking time"
          />
          <FormInput
            className={`w-full max-w-md ${
              errorStatus.image ? "input-error" : ""
            }`}
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

          <div
            className={`w-full max-w-md flex items-center ${
              errorStatus.ingredients ? "input-error" : ""
            }`}
          >
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
          <div className="w-full max-w-xs mt-2  flex int gap-3">
            {ingredients.length === 0 ? (
              <p>No ingredients yet</p>
            ) : (
              ingredients.map((ing, index) => (
                <span
                  key={index}
                  className="block mb-1 bg-gray-200 border-10 pb-1 border-gray-300 pl-4 pr-4 rounded-lg"
                >
                  {ing}
                </span>
              ))
            )}
          </div>

          <div
            className={`w-full max-w-md ${
              errorStatus.method ? "input-error" : ""
            }`}
          >
            <label htmlFor="method" className="block mb-2">
              Method:
            </label>
            <textarea
              id="method"
              name="method"
              value={method}
              onChange={handleMethodChange}
              placeholder="Enter method of meal"
              className="w-full py-2 border rounded "
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="btn bg-primary w-56 text-white py-2 px-4 rounded-lg"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={handlePreview}
              className="btn bg-secondary w-56 text-white py-2 px-4 rounded-lg"
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
          className="w-full"
        />
      )}

      {/* <div className="w-auto">
        <h2 className="text-3xl font-semibold">Ingredients Pie Chart</h2>
        {Object.keys(ingredientCounts).length > 0 ? (
          <Pie data={ingredientCounts} />
        ) : (
          <p>No ingredients added yet</p>
        )}
      </div> */}
      <div className="w-auto items-center flex flex-col">
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
