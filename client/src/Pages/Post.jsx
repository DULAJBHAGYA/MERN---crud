import React, { useState, useEffect } from "react";
import axios from 'axios';

const Post = () => {
  const [originalPosts, setOriginalPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    retrievePosts();
  }, []);

  function retrievePosts() {
    axios.get("http://localhost:8000/posts")
      .then(res => {
        console.log(res.data);
        setOriginalPosts(res.data);
        setPosts(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error retrieving posts:", error);
        setIsLoading(false);
      });
  }

  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/post/delete/${id}`)
      .then((res) => {
        alert("Delete Successfully");
        retrievePosts();
      })
      .catch(error => {
        console.error("Error deleting post:", error);
      });
  }

  const filterData = (searchKey) => {
    // Convert the search key to lowercase for case-insensitive comparison
    const lowerCaseSearchKey = searchKey.toLowerCase();
    
    // Filter the original posts based on the search key
    const filteredPosts = originalPosts.filter((post) => {
      // Convert the name and city to lowercase for case-insensitive comparison
      const lowerCaseName = post.name.toLowerCase();
      const lowerCaseCity = post.city.toLowerCase();
      
      // Check if the age is a string, and if not, convert it to a string before converting to lowercase
      const lowerCaseAge = typeof post.age === 'string' ? post.age.toLowerCase() : post.age.toString().toLowerCase();
  
      // Check if any of the properties match the search key
      return lowerCaseName.includes(lowerCaseSearchKey) ||
        lowerCaseCity.includes(lowerCaseSearchKey) ||
        lowerCaseAge.includes(lowerCaseSearchKey);
    });
  
    // Update the posts state with the filtered results
    setPosts(filteredPosts);
  };
  
  

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    if (searchKey.trim() !== "") {
      filterData(searchKey);
    } else {
      retrievePosts();
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
          <h4 style={{fontWeight:'bold', fontSize:'50px'}}>Posts</h4>
        </div>
        <div className="col-lg-3 mt-5 mb-2">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            name="searchQuery"
            onChange={handleSearchArea}
          />
        </div>
      </div>
      <table className="table table-hover" style={{ marginTop: '40px' }}>
        <thead>
          <tr>
          <th scope="col">Index</th>
            <th scope="col">Name</th>
            <th scope="col">City</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts && posts.map((post, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                <a href={`/post/${post._id}`} style={{ textDecoration: "none" }}>{post.name}</a>
              </td>
              <td>{post.city}</td>
              <td>{post.age}</td>
              <td>
                <a className="btn btn-primary" href={`/edit/${post._id}`}>
                <i className="fa fa-edit"></i>&nbsp;Edit
                </a>
                &nbsp;
                <a className="btn btn-primary" href="#" onClick={() => onDelete(post._id)}>
                <i className="fa fa-trash-alt"></i>&nbsp;Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-info">
        <a href="/addpost" style={{ textDecoration: 'none', color: "white" }}>
          Create New Post</a></button>
      

    </div>
  );
}

export default Post;
