const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// création d'une div qui contiendra les détails du cocktail
const details = document.createElement("div");
document.body.appendChild(details);

// création d'un bouton
const btn = document.createElement("button");
btn.textContent = "Récupérer un cocktail";
document.body.appendChild(btn);

// positionnement du bouton en haut de la page
btn.style.position = "sticky";
btn.style.top = 0;

document.body.appendChild(btn);

// fonction qui affiche les détails d'un cocktail
async function showCocktail() {
  try {
    // récupération des données de l'API
    const response = await fetch(API_URL);
    const data = await response.json();

    // récupération des détails du cocktail
    const cocktail = data.drinks[0];
    const title = cocktail.strDrink;
    const category = cocktail.strCategory;
    const instructions = cocktail.strInstructions;
    const image = cocktail.strDrinkThumb;

    // récupération des ingrédients du cocktail
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }

    // affichage des détails du cocktail
    // affichage des détails du cocktail
    details.innerHTML = `
<div style="margin: auto; width: 500px;">
  <h1>${title}</h1>
  <p><strong>Catégorie :</strong> ${category}</p>
  <p><strong>Instructions :</strong> ${instructions}</p>
  <h2>Ingrédients :</h2>
  <ul>
    ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
  </ul>
  <img src="${image}" alt="${title}" style="width: 200px;" />
</div>
`;
  } catch (error) {
    // affichage d'une erreur en cas d'échec de la requête
    details.textContent =
      "Une erreur est survenue lors de la récupération des données";
  }
}

// ajout d'un écouteur d'évènement sur le bouton pour afficher un cocktail au clic
btn.addEventListener("click", showCocktail);
