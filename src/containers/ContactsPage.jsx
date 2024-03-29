import Joi from "joi-browser";
import TileList from "../components/tileList/TileList";
import Form from "../components/common/form/Form";

export default class ContactsPage extends Form {
  state = {
    data: { name: "", phone: "", email: "" },
    errors: {},
    duplicateName: false,
  };

  schema = {
    name: Joi.string().min(5).required().label("Name"),
    phone: Joi.string()
      .min(10)
      .regex(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/, "(415) 333-3333")
      .required()
      .label("Phone Number"),
    email: Joi.string()
      .email()
      .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "email@email.com")
      .required()
      .label("Email"),
  };

  doSubmit = () => {
    const { data, duplicateName } = this.state;
    for (const item of this.props.items) {
      if (item.name === data.name) this.setState({ duplicateName: true });
    }
    if (duplicateName) return <h2>Contact exists</h2>;
    else {
      this.props.onAddContact(data);
      this.setState({ data: { name: "", phone: "", email: "" } });
    }
  };

  render() {
    console.log("contacts page render");
    return (
      <div>
        <section>
          <h2>Add Contact</h2>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name: John Doe")}
            {this.renderInput("phone", "Phone#: (415) 333-3333")}
            {this.renderInput("email", "Email: johnDoe@email.com", "email")}
            {this.renderButton(
              "Submit",
              "submit-btn",
              this.state.duplicateName,
            )}
          </form>
        </section>
        <hr />
        <section>
          <h2>Contacts</h2>
          <TileList items={this.props.items} />
        </section>
      </div>
    );
  }
}
