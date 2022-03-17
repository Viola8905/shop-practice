import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
const Filter = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesApi.categories;
  const [category, setCategory] = state.productsApi.category;
  const [sort, setSort] = state.productsApi.sort;
  const [search, setSearch] = state.productsApi.search;
  

	const handleCategory = e => {
		setCategory(e.target.value)
		setSearch('')
	}
	
  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters:</span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        value={search}
        placeholder="Enter your search!"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <div className="row">
        <span>Sort By:</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-price">Price:Hight - Lower</option>
          <option value="sort=price">Price: Lower - Height</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
