import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import checkAuth from '../auth/checkAuth';

function PostListItem({ post, refresh }) {
    const user = useSelector(state => state.auth.user);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${post.id}`, {
             headers: { 'Authorization': "Bearer " + user.token }
        }).then(response => {
            refresh();
            setShowModal(false); 
        }).catch(error => {
            console.error("Error deleting post:", error);
            setShowModal(false); 
        });
    };

    return (
        <div className="card">
            <div className="card-body">
                {post.name}
                <button type="button" className="btn btn-danger float-right" onClick={() => setShowModal(true)}>Delete</button>
                <Link to={`/list/posts/${post.id}/edit`} className="btn btn-success float-right">Edit</Link>
                <Link to={`/list/posts/${post.id}`} className="btn btn-info float-right">View</Link><br></br>
            </div>
            <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this post?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
        </div>
    );
}

export default checkAuth(PostListItem);
