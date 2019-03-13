import React from "react";
import styled from "@emotion/styled";

type Professor = {
  city_state_s: string;
  averageratingscore_rf: number;
  pk_id: number;
  schoolcity_s: string;
  schoolstate_full_s: string;
  pict_thumb_name_s: string;
  id: string;
  pageviews_i: number;
  averagehelpfulscore_rf: number;
  schoolcountry_s: string;
  schoolname_s: string;
  status_i: number;
  teachermiddlename_t: string;
  averagehotscore_rf: number;
  schoolstate_s: string;
  rated_date_dt: string;
  teacherfullname_s: string;
  teacherdepartment_s: string;
  total_number_of_ratings_i: number;
  visible_i: number;
  content_type_s: string;
  averageeasyscore_rf: number;
  schoolid_s: string;
  teacherfirstname_t: string;
  teacherlastname_t: string;
  averageclarityscore_rf: number;
  schoolwebpage_s: string;
  timestamp: string;
  tag_s_mv: string[];
  tag_id_s_mv: string[];
};

interface Props {
  professor: Professor;
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

export const ScheduleBuilderRMP = ({ professor }: Props) => (
  <Container id="cises-rmp">
    <HeaderLink
      href={`https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${
        professor.pk_id
      }`}
    >
      Info from Rate My Professors:
    </HeaderLink>
    <br />
    <strong>Average Rating: </strong>
    <span>{professor.averageratingscore_rf}</span>
    <br />
    <strong>Tags:</strong>
    <br />
    <TagContainer>
      {professor.tag_s_mv.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </TagContainer>
  </Container>
);
