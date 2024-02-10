import { useId, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { IoPersonAdd } from "react-icons/io5";
import { IMaskInput } from "react-imask";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("Name is a required field"),
  number: Yup.string().required("Phone number is required!"),
});

export const ContactForm = ({ onSubmit }) => {
  const [countryCode, setCountryCode] = useState("+38"); // Початковий код країни
  const [countryOptions] = useState([
    { value: "+38", label: "Ukraine (+38)", mask: "+38 (000)-000-0000" },
    { value: "+1", label: "United States (+1)", mask: "+1(000)-000-0000" },
    { value: "+44", label: "United Kingdom (+44)", mask: "+44(0000)-000000" },
    // Додайте інші країни за необхідності
  ]);

  const handleCountryChange = (e) => {
    setCountryCode(e.target.value);
  };

  const nameFieldId = useId();
  const numberFieldId = useId();

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={userSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit({ id: nanoid(), ...values });
        resetForm();
      }}
    >
      <Form className={css.form} autoComplete="off">
        <div className={css.formGroup}>
          <label className={css.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            className={css.input}
            type="text"
            name="name"
            id={nameFieldId}
            placeholder="Name Surname"
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>

        <div className={css.formGroup}>
          <label
            className={`${css.label} ${css.number}`}
            htmlFor={numberFieldId}
          >
            Number
          </label>
          <select value={countryCode} onChange={handleCountryChange}>
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Field
            as={IMaskInput}
            className={css.input}
            type="tel"
            name="number"
            id={numberFieldId}
            placeholder="066-123-45-67"
            mask={
              countryOptions.find((option) => option.value === countryCode).mask
            }
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>

        <button className={css.button} type="submit">
          <IoPersonAdd className={css.btnIcon} size="25" />
          Add user
        </button>
      </Form>
    </Formik>
  );
};
