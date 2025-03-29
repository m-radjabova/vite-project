import { Category } from "../App"

interface Props {
    categories: Category[]
    filteredProducts : (categoryId: number | string ) => void
}

function ProductFilter({ categories, filteredProducts }: Props) {
  return (
    <div>
      <select
        onChange={(e) =>
          filteredProducts(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="form-select mb-3"
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductFilter