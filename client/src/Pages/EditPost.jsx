import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState({});
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/post/${id}`).then((res) => {
      setPosts(res.data);
      setPost(res.data.post);
    });
  }, []);

  const handleUpdate = (data) => {
    axios.put(`http://localhost:8000/post/update/${id}`, data).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className='container'>
      <div className='col-md-8 mt-4 mx-auto'>
        <h1 className='h3 mb-3 font-weight-normal'>Edit Post</h1>
        <form className='needs-validation' noValidate>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Name</label>
            <input
              type='text'
              className='form-control'
              name='name'
              placeholder='Edit subject'
              onChange={(event) => {
                setPost({ ...post, name: event.target.value });
              }}
              value={post.topic}
            />
          </div>

          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>City</label>
            <input
              type='text'
              className='form-control'
              name='City'
              placeholder='Edit city'
              onChange={(event) => {
                setPost({ ...post, city: event.target.value });
              }}
              value={post.description}
            />
          </div>

          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Age</label>
            <textarea
              className='form-control'
              name='age'
              placeholder='Edit age'
              style={{ resize: 'vertical' }}
              onChange={(event) => {
                setPost({ ...post, age: event.target.value });
              }}
              value={post.age}
            ></textarea>
          </div>
          <Link to='/'>
            <button
              className='btn btn-primary'
              type='button'
              style={{ marginTop: '15px' }}
              onClick={() => handleUpdate(post)}
            >
              <i className='far fa-check-square'></i>
              &nbsp; Update
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
