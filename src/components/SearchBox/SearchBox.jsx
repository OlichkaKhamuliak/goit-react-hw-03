import css from "./SearchBox.module.css";

export const SearchBox = ({ value, onChange }) => {
  return (
    <div className={css.wrapper}>
      <input
        type="text"
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
      />
    </div>
  );
};
