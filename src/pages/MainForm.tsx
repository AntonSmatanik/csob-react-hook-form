import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import MainFields from "../components/MainFields";
import NestedFields from "../components/NestedFields";
import { FormType } from "../types";
import { formInitialValues, formValidationSchema } from "../utils";

const MainForm = () => {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(formValidationSchema),
    defaultValues: formInitialValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: FormType) => {
    console.log("onSubmit", data);
  };

  const onError = (error: FieldErrors) => {
    console.log("onError", error);
  };

  const onReset = () => {
    reset();
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
      <FormProvider {...methods}>
        <MainFields />
        <NestedFields />
        <button type="submit">Submit</button>
        <button type="button" onClick={onReset}>
          Reset
        </button>
      </FormProvider>
    </form>
  );
};

export default MainForm;
