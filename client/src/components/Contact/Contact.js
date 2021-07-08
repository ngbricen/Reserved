import React, { useState, Fragment } from 'react';
// import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

// const ContactUs = ({ createProfile, history }) => {
const Contact = ({ addPost }) => {
  const initialState = {
    name: '',
    email: '',
    text: '',
  };

  const [formData, setFormData] = useState(initialState);

  const { name, email, text } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    setFormData({
      name: '',
      email: '',
      text: '',
    });
  };

  return (
    <Fragment>
      <div className="page-inner">
        <h1>Let's start a conversation</h1>
        {/* <small>* = required field</small> */}
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Provide your name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
            <input
              type="text"
              placeholder="Provide your email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <textarea
              placeholder="Describe your request here"
              name="text"
              value={text}
              onChange={onChange}
              row="10"
              required
            />
          </div>
          <input type="submit" className="Link-btn" />
        </form>
      </div>
    </Fragment>
  );
};

Contact.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(Contact);
