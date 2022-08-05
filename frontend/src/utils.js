export function ingredientToString(ingredient) {
  return ingredient.name + (ingredient.hasKind ? `(${ingredient.kind})` : "");
}
