import React from "react";
import Post from "../common/post";
import UserPosts from "../../data/users.json";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const userPosts = UserPosts.users.filter(
    ({ username }) => username === "zielinskit"
  );
  return (
    <>
      <div className="row">
        <div className="offset-md-3 col-md-6 col-sm-12 mt-3">
          <Button href="/create">
            <FontAwesomeIcon icon={faPlus} fixedWidth />
            Create a Post
          </Button>{" "}
        </div>
      </div>
      <div className="row">
        <div className="offset-md-3 col-md-6 col-sm-12 mt-3">
          {userPosts.map((post) => (
            <Post
              key={post.posts.id}
              user={post}
              media={post.posts}
              title={post.posts.title}
              caption={post.posts.caption}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
