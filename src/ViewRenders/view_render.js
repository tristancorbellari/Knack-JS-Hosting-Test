$(document).on("knack-view-render.any", function (event, scene) {
  console.log("View rendered!");
});

// Byron's new feature editor: save images in body
$(document).on("knack-record-create.view_2673", function (event, view, record) {
  console.log("1");
  enableTextFieldImageAttachments(
    view,
    record,
    undefined,
    undefined,
    "field_1624",
    "scene_1109",
    "view_2674",
    undefined
  );
});
