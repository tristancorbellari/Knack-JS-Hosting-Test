import { API_ID } from "../constants";

let maxTries = 1;

export function makeRequest(
  requestType,
  sceneId,
  viewId,
  recordId,
  newData = {},
  filters,
  sceneUrl
) {
  if (filters === undefined) {
    filters = "";
  } else {
    filters = "?filters=" + encodeURIComponent(JSON.stringify(filters));
  }

  if (recordId === undefined || recordId === "") {
    recordId = "";
  } else {
    recordId = "/" + recordId;
  }

  if (sceneUrl === undefined) {
    sceneUrl = "";
  } else {
    sceneUrl = "?" + sceneUrl.url + "_id=" + sceneUrl.parentRecordId;
  }

  let apiUrl = `https://api.knack.com/v1/pages/${sceneId}/views/${viewId}/records${recordId}${filters}${sceneUrl}`;
  let tries = 0;

  while (tries < maxTries) {
    try {
      return new Promise(function (resolve, reject) {
        var ajaxCall = function () {
          $.ajax({
            url: apiUrl,
            type: `${requestType}`,
            headers: {
              Authorization: Knack.getUserToken(),
              "X-Knack-Application-Id": API_ID,
              "Content-Type": "application/json",
            },
            data: JSON.stringify(newData),
            success: function (data) {
              resolve(data);
            },
            error: function (error) {
              if (error.status == 429) {
                ajaxCall();
              } else {
                reject(error);
              }
            },
          });
        };
        ajaxCall();
      });
      break;
    } catch (error) {
      console.error(`Attempt ${tries + 1} failed: ${error.message}`);
      tries++;
    }
  }

  if (tries === maxTries) {
    console.error("Max retries reached. Request failed.");
  }
}

export function postImage(img) {
  var form = new FormData();
  form.append(`files`, img);

  let apiUrl = `https://api.knack.com/v1/applications/${API_ID}/assets/image/upload`;
  let tries = 0;

  while (tries < maxTries) {
    try {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: apiUrl,
          type: `POST`,
          headers: {
            Authorization: Knack.getUserToken(),
            "X-Knack-Application-ID": API_ID,
            "X-Knack-REST-API-Key": `knack`,
          },
          processData: false,
          contentType: false,
          mimeType: `multipart/form-data`,
          data: form,
          success: function (data) {
            resolve(data);
          },
          error: function (error) {
            reject(error);
          },
        });
      });
      break;
    } catch (error) {
      console.error(`Attempt ${tries + 1} failed: ${error.message}`);
      tries++;
    }
  }

  if (tries === maxTries) {
    console.error("Max retries reached. Request failed.");
  }
}

export function runTask(appId, taskId) {
  let apiUrl = `https://us-east-1-renderer-read.knack.com/v1/applications/${appId}/tasks/${taskId}/runtaskjob`;
  let tries = 0;

  while (tries < maxTries) {
    try {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: apiUrl,
          type: `GET`,
          headers: {
            Authorization: Knack.getUserToken(),
            "X-Knack-Application-ID": appId,
            "X-Knack-REST-API-Key": `knack`,
          },
          success: function (data) {
            resolve(data);
          },
          error: function (error) {
            reject(error);
          },
        });
      });
      break;
    } catch (error) {
      console.error(`Attempt ${tries + 1} failed: ${error.message}`);
      tries++;
    }
  }

  if (tries === maxTries) {
    console.error("Max retries reached. Request failed.");
  }
}
