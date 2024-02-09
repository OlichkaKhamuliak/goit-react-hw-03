import css from "./ContactList.module.css";
import { IoPersonRemove } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";

export const Contact = ({ contact: { name, number, id }, onDelete }) => {
  return (
    <div className={css.wrap}>
      <div className={css.itemContent}>
        <p className={css.text}>
          <IoPerson className={css.icon} />
          {name}
        </p>
        <p className={css.text}>
          <FaPhone className={css.icon} />
          {number}
        </p>
      </div>
      <div>
        <button className={css.btn} onClick={() => onDelete(id)}>
          <IoPersonRemove className={css.icon} size="25" />
          Delete
        </button>
      </div>
    </div>
  );
};
