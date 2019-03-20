import React from "react";
import styled from "@emotion/styled";

interface Props {
  rmpId: number;
  rating: number;
  tags: string[];
}

const Container = styled.div`
  border-radius: 15px;
  padding: 10px;
  background-color: #c0c0c0;
  color: #ffffff;
`;

const HeaderLink = styled.a`
  font-weight: 900;
  color: inherit;
  text-decoration: underline;

  :hover {
    color: inherit;
    text-decoration: underline;
  }

  :active {
    color: inherit;
    text-decoration: underline;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: #a0a0a0;
  margin: 2px;
  padding-left: 1px;
  padding-right: 1px;
`;

export const ScheduleBuilderRMP = ({ rmpId, rating, tags }: Props) => (
  <Container id="cises-rmp">
    <HeaderLink
      href={`https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${rmpId}`}
    >
      Info from Rate My Professors:
    </HeaderLink>
    <br />
    <strong>Average Rating: </strong>
    <span>{rating}</span>
    <br />
    <strong>Tags:</strong>
    <br />
    <TagContainer>
      {tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </TagContainer>
  </Container>
);
