import { useState } from "react";
import "./App.css";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { ContactList } from "./components/ContactList/ContactList";
import contacts from "./components/ContactForm/contacts.json";

// const initialUsers = [
//   { username: "Jacob", access: "r", id: 11124 },
//   { username: "Mango", access: "w", id: 89278 },
//   { username: "Elena", access: "r", id: 78817 },
//   { username: "Orlando", access: "m", id: 87667 },
//   { username: "Gimli", access: "w", id: 45776 },
// ];

export const App = () => {
  const [users, setUsers] = useState(contacts);
  const [nameFilter, setNameFilter] = useState("");

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
      <ContactForm onAdd={addUser} />
      <SearchBox value={nameFilter} onChange={setNameFilter} />
      <ContactList items={visibleUsers} onDelete={deleteUser} />
    </div>
  );
};
