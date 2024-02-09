import css from "./ContactList.module.css";

export const Contact = ({ contact: { name, number, id }, onDelete }) => {
  return (
    <div>
      <p className={css.name}>{name}</p>
      <p className={css.number}>{number}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};
