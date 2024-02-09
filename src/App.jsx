import { useEffect, useState } from "react";
import "./App.css";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { ContactList } from "./components/ContactList/ContactList";
import contacts from "./components/ContactList/contacts.json";

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
      return prevUsers.filter((user) => user.id !== userId);
    });
  };

  const visibleUsers = users.filter((user) =>
    user.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div style={{ padding: 8 }}>
      <h1>Phone Book</h1>
      <ContactForm onSubmit={addUser} />
      <SearchBox value={nameFilter} onChange={setNameFilter} />
      {visibleUsers.length > 0 ? (
        <ContactList contacts={visibleUsers} onDelete={deleteUser} />
      ) : (
        nameFilter && <p>No matches found for `{nameFilter}`</p>
      )}
    </div>
  );
};
