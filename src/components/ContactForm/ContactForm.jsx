import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { IoPersonAdd } from "react-icons/io5";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { useRef, useState } from "react";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("Name is a required field!"),
  phoneNumber: Yup.string().required("Phone number is required!"),
});

export const ContactForm = ({ onSubmit }) => {
  const phoneNumberInputRef = useRef(null); // Створюємо посилання на елемент введення номеру телефону
  const [countryCodeSelected, setCountryCodeSelected] = useState(false);

  return (
    <Formik
      initialValues={{
        name: "",
        countryCode: "+ 380",
        phoneNumber: "",
      }}
      validationSchema={userSchema}
      onSubmit={(values, { resetForm }) => {
        const { name, countryCode, phoneNumber } = values;
        onSubmit({
          id: nanoid(),
          name,
          number: `${countryCode.replace(/\s/g, "")}${phoneNumber}`, // Видаляємо пробіли з коду країни при сабміті
        });
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
          <label className={`${css.label} ${css.number}`} htmlFor="number">
            Number
          </label>
          <div className={css.phoneWrap}>
            <Field className={css.codeInput} name="countryCode" type="text">
              {({ field, form }) => (
                <IntlTelInput
                  containerClassName="intl-tel-input"
                  inputClassName={
                    field.value ? "form-control readonly" : "form-control"
                  }
                  excludeCountries={["ru"]}
                  value={field.value}
                  preferredCountries={["ua", "us", "gb"]}
                  onPhoneNumberChange={(isValid, value, countryData) => {
                    const newCountryCode = ` ${countryData.dialCode}`;
                    if (newCountryCode !== field.value) {
                      form.setFieldValue("countryCode", `+${newCountryCode}`);
                    }
                    countryCodeSelected && phoneNumberInputRef.current.focus();
                    setTimeout(() => {
                      setCountryCodeSelected(true);
                    }, 0);
                  }}
                />
              )}
            </Field>
            <Field
              className={css.inputPhone}
              name="phoneNumber"
              type="tel"
              placeholder={`Enter phone number`}
              onKeyDown={(e) => {
                const allowedChars = /[0-9()-]/; // Регулярний вираз, що дозволяє лише цифри, дужки () та тире -

                // Перевіряємо, чи натискання клавіші є допустимим
                const isValidChar = allowedChars.test(e.key);

                // Перевіряємо, чи натискання клавіші є допустимими діїми (вліво, вправо, видалення)
                const isNavigationKey = [
                  "ArrowLeft",
                  "ArrowRight",
                  "Backspace",
                  "Delete",
                ].includes(e.key);

                if (!isValidChar && !isNavigationKey) {
                  e.preventDefault(); // Заборонити введення недопустимого символу
                }
              }}
              innerRef={phoneNumberInputRef} // Додаємо innerRef для створення посилання
            />
          </div>
          <ErrorMessage
            className={css.error}
            name="phoneNumber"
            component="span"
          />
        </div>

        <button className={css.button} type="submit">
          <IoPersonAdd className={css.btnIcon} size="25" />
          Add user
        </button>
      </Form>
    </Formik>
  );
};
