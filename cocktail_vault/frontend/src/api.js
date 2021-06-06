export async function addIngredient(ingredient_id, token) {
  const url = "http://localhost:8000/api/add_inventory_item";
  const audience = "cocktail_vault";
  const formData = new FormData();
  formData.append("id", ingredient_id);
  let result = "fail";
  try {
    const authHeader = {
      audience,
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: authHeader,
      body: formData,
    });
    if ((await response.json()).result === "success") result = "success";
    else result = "fail";
  } catch (error) {
    result = "fail";
    console.log(error);
  }
  return result;
}

export async function removeIngredient(ingredient_id, token) {
  const url = "http://localhost:8000/api/remove_inventory_item";
  const audience = "cocktail_vault";
  const formData = new FormData();
  formData.append("id", ingredient_id);
  let result = "fail";
  try {
    const authHeader = {
      audience,
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: authHeader,
      body: formData,
    });
    if ((await response.json()).result === "success") result = "success";
    else result = "fail";
  } catch (error) {
    result = "fail";
    console.log(error);
  }
  return result;
}

export async function searchRecipes(term, page) {
  const url = "http://localhost:8000/api/search_recipes";
  const params = new URLSearchParams({ term, page });
  const queryUrl = url + "?" + params.toString();
  const response = await fetch(queryUrl);
  const parsedResponse = await response.json();
  return parsedResponse;
}

export async function searchRecipesWithPossession(term, page, token) {
  const url = "http://localhost:8000/api/search_recipes_with_possessions";
  const params = new URLSearchParams({ term, page });
  const authHeader = {
    audience: "cocktail_vault",
    Authorization: `Bearer ${token}`,
  };
  const queryUrl = url + "?" + params.toString();
  const response = await fetch(queryUrl, { headers: authHeader });
  const parsedResponse = await response.json();
  return parsedResponse;
}
