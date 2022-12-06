const root = document.querySelector("#root");
const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const button = document.createElement("button");

button.textContent = "Click me";
root.appendChild(button);

const fetchRandomDrink = async () => {
  const data = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );

  return await data.json();
};

button.addEventListener("click", async () => {
  const data = await fetchRandomDrink();
  // Récupérer le titre :
  const title = data.drinks[0].strDrink;

  // Récupérer la catégorie :
  const category = data.drinks[0].strCategory;

  // Récupérer les ingrédients :
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = data.drinks[0][`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }

  // Récupérer les instructions :
  const instructions = data.drinks[0].strInstructions;

  // Récupérer l'image :
  const image = data.drinks[0].strDrinkThumb;

  const h1 = document.createElement("h1");

  h1.textContent = title;

  root.appendChild(h1);
});
