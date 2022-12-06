const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

const btnDiv = document.createElement("div");
btnDiv.style.margin = "auto";
btnDiv.style.width = "500px";
btnDiv.style.textAlign = "center";
document.body.appendChild(btnDiv);

const btn = document.createElement("button");
btn.textContent = "Récupérer un cocktail";
btn.classList.add("btn");
btnDiv.appendChild(btn);

const details = document.createElement("div");
document.body.appendChild(details);


async function getCocktail() {
  const response = await fetch(API_URL);
  const data = await response.json();

  const cocktail = data.drinks[0];
  const title = cocktail.strDrink;
  const category = cocktail.strCategory;
  const instructions = cocktail.strInstructions;
  const image = cocktail.strDrinkThumb;

  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }
  return {
    title,
    category,
    instructions,
    ingredients,
    image,
  };
}

function displayCocktail(cocktail) {
  const html = `
<div id="cocktailDiv">
  <h1>${cocktail.title}</h1>
  <p><strong>Catégorie :</strong> ${cocktail.category}</p>
  <p><strong>Instructions :</strong> ${cocktail.instructions}</p>
  <h2>Ingrédients :</h2>
  <ul id="ingredientsLists">
    ${cocktail.ingredients
      .map((ingredient) => `<li>${ingredient}</li>`)
      .join("")}
  </ul>
  <img src="${cocktail.image}" alt="${cocktail.title}" id="cocktailImg" />
</div>
`;

  details.innerHTML = html;
}



async function showCocktail() {
  const cocktail = await getCocktail(API_URL);
  displayCocktail(cocktail);
}

btn.addEventListener("click", showCocktail);
