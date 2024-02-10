import { useEffect, useState } from "react";
import css from "./App.module.css";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { ContactList } from "./components/ContactList/ContactList";
import contacts from "./components/ContactList/contacts.json";
import { FaAddressBook } from "react-icons/fa";

export const App = () => {
  const [users, setUsers] = useState(() => {
    const storedContacts = window.localStorage.getItem("Saved contacts");
    if (storedContacts !== null) {
      return JSON.parse(storedContacts);
    }
    return contacts;
  });
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("Saved contacts", JSON.stringify(users));
  }, [users]);

  const addUser = (newUser) => {
    setUsers((prevUsers) => {
      return [...prevUsers, newUser];
    });
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((user) => user.id !== userId);
      // Перевірка, чи останній користувач був видалений
      if (updatedUsers.length === 0) {
        // Скидання фільтру, якщо останній користувач був видалений
        setNameFilter("");
      }
      return updatedUsers;
    });
  };

  const visibleUsers = users.filter((user) =>
    user.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div style={{ padding: 8 }}>
      <h1 className={css.title}>
        <FaAddressBook className={css.icon} />
        Phone Book
      </h1>
      <ContactForm onSubmit={addUser} />
      {users.length > 0 ? (
        <SearchBox value={nameFilter} onChange={setNameFilter} />
      ) : (
        <p className={`${css.text} ${css.noContacts}`}>
          You don`t have any contacts yet.
        </p>
      )}
      {visibleUsers.length > 0 ? (
        <ContactList contacts={visibleUsers} onDelete={deleteUser} />
      ) : (
        nameFilter && (
          <p className={css.text}>No matches found for `{nameFilter}`</p>
        )
      )}
    </div>
  );
};
