import queryString from "query-string";

export async function getProfessorFromSchool(
  teacherName: string,
  schoolName: string
) {
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

  return response.docs[0];
}
