type Props = {
  filter: "all" | "mine" | "others";
  setFilter: (value: "all" | "mine" | "others") => void;
};

const FilterDropdown = ({ filter, setFilter }: Props) => {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value as any)}
      className="border border-gray-300 px-3 py-1 rounded"
    >
      <option value="all">All Posts</option>
      <option value="mine">My Posts</option>
      <option value="others">Other Authors</option>
    </select>
  );
};

export default FilterDropdown;