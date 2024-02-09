import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 symb long")
    .required("Name is a required field"),
  number: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?[0-9()-]*$/, "Invalid phone number"),
});

export const ContactForm = ({ onSubmit }) => {
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
        // console.log(values);
        onSubmit({ id: nanoid(), ...values });
        resetForm();
      }}
    >
      <Form className={css.form} autoComplete="off">
        <div className={css.formGroup}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            type="text"
            name="name"
            id={nameFieldId}
            placeholder="Name Surname"
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field
            type="text"
            name="number"
            id={numberFieldId}
            placeholder="123-45-67"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>

        <button type="submit">Add user</button>
      </Form>
    </Formik>
  );
};
