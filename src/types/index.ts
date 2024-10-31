import * as yup from "yup";
import { formValidationSchema } from "../utils";

export type FormType = yup.InferType<typeof formValidationSchema>;

export type MainFieldsType = Pick<FormType, "amount" | "damagedParts">;

export type NestedFieldsType = Pick<FormType, "allocation" | "witnesses">;

export type CategoryType = Pick<FormType, "category">;

export type CategoryOptionsType = { slug: string; name: string }[];
