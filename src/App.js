import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import AppointmentPage from "./containers/AppointmentPage";
import ContactsPage from "./containers/ContactsPage";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const addContact = (contact) => {
    setContacts((prev) => [...prev, contact]);
  };

  const addAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    <div className="App">
      <nav>
        <NavLink to="/contacts">Contacts</NavLink>
        <NavLink to="/appointments">Appointments</NavLink>
      </nav>
      <main>
        <Routes>
          <Route
            path="/contacts"
            element={
              <ContactsPage items={contacts} onAddContact={addContact} />
            }
          />
          <Route
            path="/appointments"
            element={
              <AppointmentPage
                appointments={appointments}
                contacts={contacts}
                onAddAppointment={addAppointment}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
