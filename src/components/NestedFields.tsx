import debounce from "debounce";
import { ChangeEvent, lazy, Suspense } from "react";
import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import { FormType, NestedFieldsType } from "../types";
import { EMAIL_INPUT_DEBOUNCE } from "../utils";

const LazySelect = lazy(() => import("./Select"));

const NestedFields = () => {
  const { register } = useFormContext<NestedFieldsType>();
  const { errors } = useFormState<NestedFieldsType>({
    name: ["allocation", "witnesses"],
    exact: false,
  });

  const amount = useWatch<FormType>({
    name: "amount",
  });

  const { fields, append, remove } = useFieldArray({
    name: "witnesses",
  });

  return (
    <>
      <div>
        <label>
          Allocation
          <input
            className={errors.allocation && "error"}
            type="number"
            {...register("allocation", {
              disabled: !amount,
            })}
          />
        </label>
        {errors.allocation && (
          <div className="error">{errors.allocation.message}</div>
        )}
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <LazySelect />
      </Suspense>

      <div>
        <fieldset className="witnesses">
          <legend>Witnesses</legend>

          {fields.map((field, index) => (
            <div key={field.id}>
              <div>
                <label>
                  Name
                  <input
                    className={errors.witnesses?.[index]?.name && "error"}
                    {...register(`witnesses.${index}.name`)}
                  />
                </label>

                {errors.witnesses?.[index]?.name && (
                  <div className="error">
                    {errors.witnesses[index]?.name?.message}
                  </div>
                )}
              </div>

              <div>
                <label>
                  Email
                  <input
                    className={errors.witnesses?.[index]?.email && "error"}
                    {...register(`witnesses.${index}.email`)}
                    onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
                      //  we can use this approach to change value and trigger validation

                      // setValue(`witnesses.${index}.email`, e.target.value);
                      // trigger(`witnesses.${index}.email`);

                      //  or even simpler
                      register(`witnesses.${index}.email`).onChange(e);
                    }, EMAIL_INPUT_DEBOUNCE)}
                  />
                </label>

                {errors.witnesses?.[index]?.email && (
                  <div className="error">
                    {errors.witnesses[index]?.email?.message}
                  </div>
                )}
              </div>

              <button type="button" onClick={() => remove(index)}>
                Remove Witness
              </button>
            </div>
          ))}

          <button type="button" onClick={() => append({ name: "", email: "" })}>
            Add Witness
          </button>

          {errors.witnesses && (
            <div className="error">{errors.witnesses.message}</div>
          )}
        </fieldset>
      </div>
    </>
  );
};

export default NestedFields;
