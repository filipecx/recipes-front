import { ListsContainer } from "../components/ListsContainer";

export function RecipesLists() {
  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold text-gray-800">Your recipes</h1>
      <ListsContainer />
    </div>
  );
}
