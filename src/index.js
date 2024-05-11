// import _ from "lodash";

// function component() {
//   const element = document.createElement("div");

//   // Lodash, now imported by this script
//   element.innerHTML = _.join(["Hello", "webpack"], " ");

//   return element;
// }

// document.body.appendChild(component());

$(document).on("knack-scene-render.any", function (event, scene) {
  console.log("Page rendered!");
});
