import { getProfessorFromSchool } from "./lib/rmp";

const schoolName = "University of Utah";

async function getProfessorFromScheduleClassModal() {
  const elements = document.querySelectorAll(
    "html body.static-header.modal-open div#base-modal.modal.fade.center-lg.in div.modal-dialog.modal-lg div.modal-content div.modal-body div.row div.col-md-6 ul.section-details li.persist"
  );

  for (let element of elements) {
    if ((element as HTMLElement).innerText.match(/Instructor: /)) {
      const name = ((element as HTMLElement).lastChild as Text).data;
      return await getProfessorFromSchool(name, schoolName);
    }
  }

  return undefined;
}

const bodyObserver = new MutationObserver(mutationsList => {
  for (var mutation of mutationsList) {
    if (mutation.type == "childList") {
      mutation.addedNodes.forEach(node => {
        if ((node as Element).id === "base-modal") {
          getProfessorFromScheduleClassModal().then(console.log);
        }
      });
    }
  }
});

// Start observing the target node for configured mutations
bodyObserver.observe(document.body, {
  attributes: false,
  childList: true,
  subtree: false
});
