function base64ImageToBlob(str) {
  // extract content type and base64 payload from original string
  var pos = str.indexOf(";base64,");
  var type = str.substring(5, pos);
  var b64 = str.substr(pos + 8);

  // decode base64
  var imageContent = atob(b64);

  // create an ArrayBuffer and a view (as unsigned 8-bit)
  var buffer = new ArrayBuffer(imageContent.length);
  var view = new Uint8Array(buffer);

  // fill the view, using the decoded base64
  for (var n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }

  // convert ArrayBuffer to Blob
  var blob = new Blob([buffer], { type: type });

  return blob;
}

/******
 * Allow for image attachments in rich text fields.
 *
 * Rich text fields do not natively allow for images, really. But with this, they do!
 * Using this function, a user can PrtSc + paste images into a rich text field. These snippets can then either
 * be saved into the text field, or into separate Image fields in a table.
 * To use, simply call enableTextFieldImageAttachments on the record create event for any view with a rich text field.
 *
 * LIMITATIONS:
 * - At the moment, this only works for views with a single rich text field. May have to allow for more specific/multiple selections
 * - Works for record create events, may or may not work for record updates. Haven't tested
 *
 * @param {Object}   view               View that contains the rich text field.
 * @param {Object}   record             Record from the record create event.
 * @param {List}     attachmentFields   Names of fields that will store the images. Optional (to store directly in text field, set as undefined).
 * @param {Number}   maxImages          Maximum number of images to store (additional images will be discarded). Optional.
 * @param {String}   textField          Name of the target rich text field.
 * @param {String}   sceneToUpdate      Name of the scene which contains the view to be updated.
 * @param {String}   viewToUpdate       Name of the view which displays the grid/table to be updated (i.e. to post images to). Make sure inline editing is enabled.
 * @param {String}   gridsToRefresh      Names of the grids to refresh which displays the table where the images lie. Optional.
 *
 ******/
function enableTextFieldImageAttachments(
  view,
  record,
  attachmentFields,
  maxImages,
  textField,
  sceneToUpdate,
  viewToUpdate,
  gridsToRefresh
) {
  var recordId = record.id;
  var textFieldBody = record[textField];
  var imagesInEditor = document
    .getElementsByClassName("redactor-editor")[0]
    .getElementsByTagName("img");

  if (imagesInEditor.length > 0) {
    // Restrict max number of images to be uploaded, if applicable
    let max =
      maxImages === undefined
        ? imagesInEditor.length
        : Math.min(imagesInEditor.length, maxImages);

    async function handleAllImages() {
      for (let i = 0; i < max; ++i) {
        // Pull image from text editor and cast to file with correct format
        var base64ImgSrc = imagesInEditor[i].src;
        console.log(base64ImgSrc);

        var blob = base64ImageToBlob(base64ImgSrc);
        console.log(blob);

        var imgFilename =
          Knack.getUserAttributes().name +
          " - " +
          view.key +
          "-img " +
          Date.now() +
          ".png";
        var imgFile = new File([blob], imgFilename, { type: "image/png" });
        console.log(imgFilename);
        console.log(imgFile);

        function fetchData() {
          return new Promise(function (resolve, reject) {
            resolve(postImage(imgFile));
          });
        }

        async function handleImage() {
          try {
            var responseData = await fetchData();
            console.log("fetched data");
            console.log(responseData);
            var imgID = JSON.parse(responseData).id;
            var imgSrc = JSON.parse(responseData).public_url;

            console.log(textFieldBody);

            // Correct all <img> tags in the text field body
            console.log(textFieldBody);
            // const reg = /<img.*>/
            if (attachmentFields === undefined) {
              textFieldBody = textFieldBody.replace(
                /<img(?!( src="https:\/\/s3.amazonaws.com)).*?>/,
                `<img src="${imgSrc}">`
              );
              // textFieldBody = textFieldBody.replace('<img />', `<img src="${imgSrc}">`);
              // textFieldBody = textFieldBody.replace('<img>', `<img src="${imgSrc}">`);
            } else {
              textFieldBody = textFieldBody.replaceAll(/<img(.*?)>/g, "");
              // textFieldBody = textFieldBody.replaceAll('<img />', '');
              // textFieldBody = textFieldBody.replaceAll('<img>', '');
            }

            console.log(textFieldBody);

            // Set the appropriate fields to store the text and image
            let newData = {};
            newData[textField] = textFieldBody;
            if (attachmentFields !== undefined) {
              newData[attachmentFields[i]] = imgID;
            }

            console.log(textFieldBody);

            console.log(newData);

            // Update fields
            await makeRequest(
              "PUT",
              sceneToUpdate,
              viewToUpdate,
              recordId,
              newData
            );

            // Refresh the table views to show the changes
            if (gridsToRefresh !== undefined) {
              for (let j = 0; j < gridsToRefresh.length; ++j) {
                Knack.views[gridsToRefresh[j]].model.fetch();
              }
            }
          } catch (error) {
            console.error("Error: ", error);
          }
        }

        handleImage();
      }
    }

    handleAllImages();
  }
}
