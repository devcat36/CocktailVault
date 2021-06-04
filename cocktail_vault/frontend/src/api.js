export async function addIngredient(ingredient_id, token) {
  const url = "http://localhost:8000/api/add_inventory_item";
  const audience = "cocktail_vault"
  const formData = new FormData();
  formData.append('id', ingredient_id)
  let result = "fail";
  try {
    const authHeader = {
      audience,
      Authorization: `Bearer ${token}`
    };
    const response = await fetch(url, {
      method: "POST",
      headers: authHeader,
      body: formData
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
  const audience = "cocktail_vault"
  const formData = new FormData();
  formData.append('id', ingredient_id)
  let result = "fail";
  try {
    const authHeader = {
      audience,
      Authorization: `Bearer ${token}`
    };
    const response = await fetch(url, {
      method: "POST",
      headers: authHeader,
      body: formData
    });
    if ((await response.json()).result === "success") result = "success";
    else result = "fail";
  } catch (error) {
    result = "fail";
    console.log(error);
  }
  return result;
}