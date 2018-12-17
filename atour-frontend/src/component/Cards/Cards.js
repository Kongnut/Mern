import React from "react";
import { Flex } from "rebass";
import CardItem from "./CardItem";

const Cards = props => {
  const { isUser, items, tours } = props;
  return (
    <Flex
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center"
      }}
      width={1}
      flexWrap="wrap"
    >
      {items
        ? items.map(item => (
            <div
              key={isUser ? item.userId : item.tourId}
              style={{ margin: "10px 20px 10px 20px" }}
            >
              <CardItem item={item} isUser={isUser} tours={tours} />
            </div>
          ))
        : null}
    </Flex>
  );
};

export default Cards;
