import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { IoPersonAdd } from "react-icons/io5";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("Name is a required field"),
  number: Yup.string().required("Phone number is required!"),
});

export const ContactForm = ({ onSubmit }) => {
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
          <label className={css.label} htmlFor="name">
            Name
          </label>
          <Field
            className={css.input}
            type="text"
            name="name"
            id="name"
            placeholder="Name Surname"
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>

        <div className={css.formGroup}>
          <label className={css.label} htmlFor="number">
            Number
          </label>
          <Field name="number" type="tel">
            {({ field, form }) => (
              <IntlTelInput
                containerClassName="intl-tel-input"
                inputClassName="form-control"
                fieldName="number"
                value={field.value} // Передаємо значення поля до компонента
                onPhoneNumberChange={(isValid, value, countryData) => {
                  const cleanedValue = value.replace(/[^\d()-]/g, "");
                  form.setFieldValue("number", cleanedValue);
                  console.log(countryData);
                }}
                defaultCountry="ua"
              />
            )}
          </Field>
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
