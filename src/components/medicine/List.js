import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import PostListItem from './PostListItem';
import checkAuth from '../auth/checkAuth';

function List() {
  const user = useSelector(store => store.auth.user);
  const [posts, setPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searched, setSearched] = useState(false); 

  useEffect(() => {
    if (user && user.token) {
      fetchPosts();
    } else {
      console.error('User is not logged in.');
    }
  }, [user]);

  function fetchPosts() {
    let url = 'https://medicalstore.mashupstack.com/api/medicine';
    if (searchKeyword) {
      url += `/search?keyword=${searchKeyword}`;
    }

    axios.get(url, {
      headers: { 'Authorization': 'Bearer ' + user.token }
    })
      .then(response => {
        setPosts(response.data);
        setSearched(true); 
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }

  const handleSearch = () => {
    fetchPosts();
  };

  return (
    <div>
      <Navbar />
      <div className="row">
        <div className="col-8 offset-2">
          <br /><br />
          <div className="text-center">
            <Link to="/list/posts/create" className="btn btn-primary mb-3">Add Medicine</Link>
          </div>
          <br />
          <h1 className='text-center'><b>Medicine List</b></h1><br />

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for medicine..."
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
            </div>
          </div>

      
          {searched && posts.length === 0 && (
            <p className="text-center">No medicines found.</p>
          )}

          {posts.map(post => (
            <PostListItem key={post.id} post={post} refresh={fetchPosts} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default checkAuth(List);
