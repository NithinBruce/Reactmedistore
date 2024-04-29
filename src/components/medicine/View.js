import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function View() {
  const { postId } = useParams();
  const [post, setPost] = useState({ name: "", company: "", expiry_date: "" });
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://medicalstore.mashupstack.com/api/medicine/${postId}`,
          {
            headers: { Authorization: "Bearer " + user.token },
          }
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (user && user.token) {
      fetchData();
    }
  }, [postId, user]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br></br>
            <br></br>
            <br></br>
            <div className="card mt-5">
              <div className="card-header text-center bg-success">
                <h3>{post.name}</h3>
              </div>
              <div className="card-body">Company:{post.company}</div>
              <div className="card-body">Expiry date:{post.expiry_date}</div>
            </div>
            <Link to="/list/posts" className="btn btn-dark mt-3 +">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(View);
