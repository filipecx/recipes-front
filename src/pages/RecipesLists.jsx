import { ListsContainer } from "../components/ListsContainer";

export function RecipesLists() {
  return (
    <div className="p-6 grid gap-4">
      <h1>Your recipes</h1>
      <ListsContainer />
    </div>
  );
}
