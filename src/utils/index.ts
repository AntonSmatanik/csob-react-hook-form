import * as yup from "yup";

export const CATEGORIES_URL = "https://dummyjson.com/products/categories";

export const damagedPartsOptions = ["roof", "front", "side", "rear"];

export const formInitialValues = {
  amount: 250,
  allocation: 140,
  damagedParts: ["side", "rear"],
  category: "kitchen-accessories",
  witnesses: [
    {
      name: "Marek",
      email: "marek@email.cz",
    },
    {
      name: "Emily",
      email: "emily.johnson@x.dummyjson.com",
    },
  ],
};

export const EMAIL_INPUT_DEBOUNCE = 1000;
const EMAIL_CHECK_URL = "https://dummyjson.com/users/search?q=";

const emailExists = async (value: string): Promise<boolean> => {
  const response = await fetch(`${EMAIL_CHECK_URL}${value}`);
  const data = await response.json();

  return data.users.length === 0;
};

let validatedEmails = new Map<string, boolean>();

export const formValidationSchema = yup.object().shape({
  amount: yup
    .number()
    .required("Required")
    .min(0)
    .max(300)
    .typeError("Must be a number"),
  allocation: yup
    .number()
    .required("Required")
    .min(0)
    .max(yup.ref("amount"))
    .typeError("Must be a number"),
  damagedParts: yup.array().required("Required").min(1, "Check at least one"),
  category: yup.string().required("Required"),
  witnesses: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Required"),
        email: yup
          .string()
          .required("Required")
          .email("Must be a valid email")
          .test(
            "email-exists",
            "Email already in use",
            async (value, context) => {
              //  preventing to run the validation again if the email has been already validated
              if (validatedEmails.has(value)) {
                return validatedEmails.get(value) as boolean;
              }

              //  preventing to run the validation if not needed, because yup does not support validation chain order
              await yup.string().required().validate(value);
              await yup.string().email().validate(value);

              //  email validation
              return new Promise<boolean>(async (resolve) => {
                const exists = await emailExists(value);
                validatedEmails.set(value, exists);
                resolve(exists);
              });
            }
          ),
      })
    )
    .min(1, "Add at least one")
    .max(5, "Max 5"),
});
