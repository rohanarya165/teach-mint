import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [totalAllPost, setTotalAllPost] = useState([]);

  const fetchUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchTotalAllPost = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setTotalAllPost(response.data);
      }).catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTotalAllPost();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  let viewPostNum = (id) => {
    let num = totalAllPost.filter(
          (postItem) => id === postItem.userId
        )
        return num.length
  }

  return (
    <div className="container">
      <h1>User Directory</h1>
      {users.map((user) => (
        <Link key={user.id} to={`/user/${user.id}`} className="user-card">
          <div>Name : {user.name}</div>
          <div>{`Posts : ${viewPostNum(user.id) || 0}`}</div>
        </Link>
      ))}
    </div>
  );
};

export default UserList;
