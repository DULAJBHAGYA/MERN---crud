import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPost = () => {
  const [state, setState] = useState({
    name: '',
    city: '',
    age: '',
    posts: [], // Add posts to the state
  });

  useEffect(() => {
    axios
      .get('http://localhost:8000/posts')
      .then((response) => {
        setState((prevState) => ({ ...prevState, posts: response.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { name, city, age } = state;

    const data = {
      name: name,
      city: city,
      age: age,
    };

    axios
      .post('http://localhost:8000/post/save', data)
      .then((res) => {
        if (res.data.success) {
          setState((prevState) => ({
            ...prevState,
            name: '',
            city: '',
            age: '',
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <div className='col-md-8 mt-4 mx-auto'>
        <h1 className='h3 mb-3 font-weight-normal'>Add post</h1>
        <form className='needs-validation' noValidate>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Name</label>
            <input
              type='text'
              className='form-control'
              name='name'
              placeholder='Enter name'
              value={state.name}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>City</label>
            <input
              type='text'
              className='form-control'
              name='city'
              placeholder='Enter city'
              value={state.city}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Age</label>
            <input
              type='text'
              className='form-control'
              name='age'
              placeholder='Enter age'
              value={state.age}
              onChange={handleInputChange}
            />
          </div>

          <button
            className='btn btn-primary'
            type='submit'
            style={{ marginTop: '15px' }}
            onClick={onSubmit}
          >
            <i className='far fa-check-square'></i>
            &nbsp; Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
