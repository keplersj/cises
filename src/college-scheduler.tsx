import React from "react";
import ReactDOM from "react-dom";
import { getProfessorFromSchool } from "./lib/rmp";
import { ScheduleBuilderRMP } from "./views/schedule_builder_rmp";

const schoolName = "University of Utah";

async function getProfessorFromScheduleClassModal() {
  const elements = document.querySelectorAll(
    "html body.static-header.modal-open div#base-modal.modal.fade.center-lg.in div.modal-dialog.modal-lg div.modal-content div.modal-body div.row div.col-md-6 ul.section-details li.persist"
  );

  for (let element of elements) {
    if ((element as HTMLLIElement).innerHTML.match(/Instructor:/)) {
      const name = ((element as HTMLLIElement).lastChild as Text).data;
      return await getProfessorFromSchool(name, schoolName);
    }
  }

  return undefined;
}

async function renderProfInfoInModal() {
  const professor = await getProfessorFromScheduleClassModal();

  if (professor) {
    const container = document.querySelector(
      ".modal-body > div:nth-child(1) > div:nth-child(2)"
    );
    const rmpComponentContainer = document.createElement("div");
    ReactDOM.render(
      <ScheduleBuilderRMP
        rmpId={professor.pk_id}
        rating={professor.averageratingscore_rf}
        tags={professor.tag_s_mv}
      />,
      rmpComponentContainer
    );
    container && container.appendChild(rmpComponentContainer);
  }
}

const bodyObserver = new MutationObserver(mutationsList => {
  mutationsList.forEach(mutation => {
    Array.from(mutation.addedNodes.values())
      .filter(node => (node as Element).id === "base-modal")
      .forEach(renderProfInfoInModal);
  });
});

// Start observing the target node for configured mutations
bodyObserver.observe(document.body, {
  childList: true
});
