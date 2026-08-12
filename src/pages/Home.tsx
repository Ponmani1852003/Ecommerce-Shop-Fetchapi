import { useMemo, useState } from "react";
import { getAllProducts, getCategories } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 400);

  //data fetching

  const { data: products, isLoading, error } = useFetch(getAllProducts, []);
  const { data: categories } = useFetch(getCategories, []);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (debouncedSearch.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price); //price low to high
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price); //price high to low
    } else if (sortOption === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, selectedCategory, debouncedSearch, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <CategoryFilter
          categories={categories || []} //categoreis value null , display the empty arr
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <SortDropdown value={sortOption} onChange={setSortOption} />
      </div>

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 py-10">No products found.</p>
      )}

      {!isLoading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}