import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import styles from "./fooddetails.module.css";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "86479d09673f4279868c7feee6d9ef7f";
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false); // to check whether this fetch is loaded
    }
    fetchFood();
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>

        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⏰{food.readyInMinutes} Minutes</strong>
          </span>
          <strong>👪Serves {food.servings}</strong>
          <strong>
            {food.vegetarian ? "🥕 Vegetarian" : "🍖 Non-Vegetarian"}
          </strong>
          <strong>{food.vegan ? "🐄 Vegan" : ""}</strong>
        </div>
        <div>
          <strong>💲{food.pricePerServing / 100} Per serving</strong>
        </div>
        <h2>Ingredients</h2>
        <ItemList food={food} />
        <h2>Instructions</h2>
      </div>
    </div>
  );
}
