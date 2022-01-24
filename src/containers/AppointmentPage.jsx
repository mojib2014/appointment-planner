import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form/Form";
import TileList from "../components/tileList/TileList";

export default class AppointmentPage extends Form {
  state = {
    data: { title: "", contact: "", date: "", time: "" },
    errors: {},
  };

  schema = {
    title: Joi.string().min(3).required().label("Title"),
    contact: Joi.string().required().label("Contact"),
    date: Joi.date().required().label("Date"),
    time: Joi.string().required().label("Time"),
  };

  doSubmit = () => {
    const { data } = this.state;
    this.props.onAddAppointment(data);
    this.setState({ data: { title: "", contact: "", date: "", time: "" } });
  };

  getTodayString = () => {
    const [month, day, year] = new Date()
      .toLocaleDateString("en-US")
      .split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  render() {
    const { appointments, contacts } = this.props;
    return (
      <div>
        <section>
          <h1>Add Appointment</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title: something")}
            {this.renderInput(
              "date",
              "Date: 03/15/2021",
              "date",
              this.getTodayString(),
            )}
            {this.renderInput("time", "Time: 6:40", "time")}
            {this.renderSelect("contact", contacts)}
            {this.renderButton("Submit")}
          </form>
        </section>
        <section>
          <h2>Appointments</h2>
          <TileList items={appointments} />
        </section>
      </div>
    );
  }
}
