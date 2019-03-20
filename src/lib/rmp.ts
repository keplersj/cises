import queryString from "query-string";

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

export async function getProfessorFromSchool(
  teacherName: string,
  schoolName: string
): Promise<Professor> {
  const query = queryString.stringify({
    bf: "pow(total_number_of_ratings_i,2.1)",
    callback: "noCB",
    defType: "edismax",
    fq: `schoolname_t:"${schoolName}"`,
    group: "off",
    "group.field": "content_type_s",
    "group.limit": "20",
    "json.wrf": "noCB",
    q: teacherName,
    qf:
      "teacherfirstname_t^2000 teacherlastname_t^2000 teacherfullname_t^2000 teacherfullname_autosuggest",
    rows: ["20", "20"],
    siteName: "rmp",
    solrformat: "true",
    sort: "score desc",
    wt: "json"
  });

  const res = await fetch(
    `https://search-production.ratemyprofessors.com/solr/rmp/select/?${query}`
  );

  function noCB(obj: any) {
    return obj;
  }

  const { response } = eval(await res.text());

  return response.docs[0] as Professor;
}
