import React from "react";
import { Flex } from "rebass";
import CardItem from "./CardItem";

const Cards = props => {
  const { isUser, items, savedTourList, isOwn } = props;
  let sorted = items;
  if (!isUser) {
    if (items) {
      let tour = items;
      if (!isOwn) {
        tour = tour.filter(t => {
          return t.isPublished;
        });
      }
      tour = tour.map(t => {
        if (savedTourList.includes(t.tourId)) {
          return { ...t, isSaved: true };
        }
        return t;
      });
      sorted = tour.sort((a, b) => {
        if (a.isSaved && !b.isSaved) {
          return -1;
        }
        if (b.isSaved && !a.isSaved) {
          return 1;
        }
        return 0;
      });
    }
  }
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
      {sorted
        ? sorted.map(item => (
            <div
              key={isUser ? item.userId : item.tourId}
              style={{ margin: "10px 20px 10px 20px" }}
            >
              <CardItem item={item} isUser={isUser} />
            </div>
          ))
        : null}
    </Flex>
  );
};

export default Cards;
