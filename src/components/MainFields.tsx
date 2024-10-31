import { useFormContext, useFormState } from "react-hook-form";
import { MainFieldsType } from "../types";
import { damagedPartsOptions } from "../utils";

const MainFields = () => {
  const { register } = useFormContext<MainFieldsType>();
  const { errors } = useFormState<MainFieldsType>({
    name: ["amount", "damagedParts"],
    exact: true,
  });

  return (
    <>
      <div>
        <label>
          Amount
          <input
            className={errors.amount && "error"}
            type="number"
            {...register("amount")}
          />
        </label>
        {errors.amount && <div className="error">{errors.amount.message}</div>}
      </div>

      <div>
        <fieldset className={errors.damagedParts && "error"}>
          <legend>Damaged parts</legend>
          {damagedPartsOptions.map((part) => (
            <label key={part}>
              <input
                type="checkbox"
                {...register("damagedParts")}
                value={part}
              />
              {part}
            </label>
          ))}
        </fieldset>
        {errors.damagedParts && (
          <div className="error">{errors.damagedParts.message}</div>
        )}
      </div>
    </>
  );
};

export default MainFields;
