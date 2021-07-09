import React from "react";
import Post from "../common/post";
import FEED from "../../data/posts.json";

const Home = () => {
  return (
    <div className="row">
      <div className="offset-md-3 col-md-6 col-sm-12 mt-3">
        {FEED.post.map((post) => (
          <Post
            key={post.id}
            user={post.user}
            media={post.media}
            title={post.title}
            caption={post.caption}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
