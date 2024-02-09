import css from "./SearchBox.module.css";

export const SearchBox = ({ value, onChange }) => {
  return (
    <div className={css.wrapper}>
      <p>Finds contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
      />
    </div>
  );
};
