import React, { useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import AppointmentPage from "./containers/appointmentPage/AppointmentPage";
import ContactsPage from "./containers/contactsPage/ContactsPage";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const addContact = (contact) => {
    setContacts((prev) => [...prev, contact]);
  };

  const [appointments, setAppointments] = useState([]);
  const addAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const ROUTES = {
    CONTACTS: "/contacts",
    APPOINTMENTS: "/appointments",
  };

  return (
    <div className="App">
      <nav>
        <NavLink to={ROUTES.CONTACTS} activeClassName="active">
          Contacts
        </NavLink>
        <NavLink to={ROUTES.APPOINTMENTS} activeClassName="active">
          Appointments
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route path={ROUTES.CONTACTS}>
            <ContactsPage items={contacts} onAddContact={addContact} />
          </Route>
          <Route path={ROUTES.APPOINTMENTS}>
            <AppointmentPage
              appointments={appointments}
              contacts={contacts}
              onAddAppointment={addAppointment}
            />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
