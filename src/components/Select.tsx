import { useEffect, useState } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { CategoryOptionsType, CategoryType } from "../types";
import { CATEGORIES_URL } from "../utils";

const Select = () => {
  const [categories, setCategories] = useState<CategoryOptionsType>([]);

  const { register } = useFormContext<CategoryType>();
  const { errors } = useFormState<CategoryType>({
    name: "category",
    exact: true,
  });

  useEffect(() => {
    const loadData = async () => {
      const result = await fetch(CATEGORIES_URL);
      const data = await result.json();

      setCategories(data);
    };

    loadData();
  }, []);

  if (!categories.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <label>
        Category
        <select
          className={errors.category && "error"}
          {...register("category")}
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      {errors.category && (
        <div className="error">{errors.category.message}</div>
      )}
    </div>
  );
};

export default Select;
