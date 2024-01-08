// src/components/UserDetail.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ClockFunction from "./ClockFunction";
import {convertTimeFormat} from "./timeConverter"

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [contries, setContries] = useState([]);
  const [selectedCountry,setSelectedCountry] = useState([]);
  const [selectedTime, setselectedTime] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      const userResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      setUser(userResponse.data);

      const postResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      setPosts(postResponse.data);
    };

    axios.get("http://worldtimeapi.org/api/timezone").then((res) => {
      setContries(res.data);
    }).catch(function (error) {
      console.log(error);
    });

    fetchUser();
  }, [userId]);

  let selectCountryFn = (e) => {
    setSelectedCountry(e.target.value)
    axios.get(`http://worldtimeapi.org/api/timezone/${selectedCountry}`).then((res) => {
      let time =  convertTimeFormat(res.data.datetime)   
      console.log("res.data.datetime", time)
         setselectedTime(time)
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">
        Back to User Directory
      </Link>

      <h1>{user.name}'s Profile</h1>
      <div className="clock-section">
        <h2>Current Time</h2>
        <select className="dropDownCss" onClick={selectCountryFn}>
          {contries.map((country) => {
            return <option value={country} >{country}</option>;
          })}
        </select>
        <ClockFunction selectedTime={selectedTime}/>
      </div>
      <div className="user-details-section">
        <div>
          <h2>Name</h2>
          <p>{user.name}</p>
          <h2>Username</h2>
          <p>{user.username}</p>
          <h2>Catch Phrase</h2>
          <p>{user.company?.catchPhrase}</p>
        </div>
        <div>
          <h2>Address</h2>
          <p>{`${user.address?.city}, ${user.address?.street}, ${user.address?.suite}`}</p>
          <h2>Email</h2>
          <p>{user.email}</p>
          <h2>Phone</h2>
          <p>{user.phone}</p>
        </div>
      </div>
      <div className="posts-section">
        <h2>Posts</h2>
        <div className="postContainer">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
