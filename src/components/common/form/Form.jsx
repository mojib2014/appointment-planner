import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../input/Input";
import Select from "../select/Select";

export default class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const { data } = this.state;
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  renderInput = (name, placeholder, type = "text", min) => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        placeholder={placeholder}
        min={min}
      />
    );
  };

  renderSelect = (name, options) => {
    const { errors } = this.state;
    return (
      <Select
        name={name}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderButton = (label, className, duplicate) => {
    return (
      <button className={className} onClick={this.handleSubmit}>
        {duplicate ? "Contact exists!" : label}
      </button>
    );
  };
}
