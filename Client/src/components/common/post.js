import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Posts = (props) => {
  return (
    <Card className="mt-4">
      <Card.Header>
        <div className="d-inline">
          <Image
            style={{ width: 30, height: 30 }}
            src={props.user.profilePhoto}
            roundedCircle
            className="mr-2"
          />
          <div className="d-inline font-weight-bold">{props.user.name}</div>
        </div>
        <div className="d-inline float-right">
          <FontAwesomeIcon
            className="align-middle"
            icon={faEllipsisH}
            fixedWidth
          />
        </div>
      </Card.Header>
      <Card.Img variant="top" src={props.media.uuid} />

      <Card.Body>
        <Card.Text className="mt-2">
          <span className="d-inline font-weight-bold mr-2">
            {props.user.name}
          </span>
          {props.caption}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Posts;
