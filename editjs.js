// ********** Fetch Data for edit page **********
//#region
fetchData();
function fetchData() {
  let myId = new URLSearchParams(window.location.search).get("id");
  let urlEdit = `https://jsonplaceholder.typicode.com/photos/${myId}`;
  fetch(urlEdit)
    .then((res) => {
      console.log("resolved", res);
      return res.json();
    })
    .then((data) => {
      let imgSrc = data.thumbnailUrl;
      let id = data.id;
      let albumId = data.albumId;
      let title = data.title;
      createEditPage(imgSrc, id, albumId, title);
    })
    .catch((err) => {
      console.log("error", err);
    });
}
//#endregion

// *************** function to edit card *****************
// #region

let createEditPage = (imgSrc, id, albumId, title) => {
  let saveBtn_editPage = document.getElementById("saveBtn");
  let cancelBtn_editPage = document.getElementById("cancelBtn");

  // append image
  let img_editPage = document.getElementById("img");
  img_editPage.setAttribute("src", `${imgSrc}`);

  // append id
  let id_editPage = document.getElementById("id");
  id_editPage.innerHTML = `<b>ID is: ${id}</b>`;

  // append albumID
  let albumId_editPage = document.getElementById("albumId");
  albumId_editPage.setAttribute("value", `${albumId}`);

  // append title
  let title_editPage = document.getElementById("title");
  title_editPage.setAttribute("value", `${title}`);
};

// #endregion

// ******* Function to pass edited values to landing page******
//#region

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const newAlbumId = document.getElementById("albumId").value;
  const newTitle = document.getElementById("title").value;

  const data = {
    newAlbumId: newAlbumId,
    newTitle: newTitle,
  };

  postData("https://jsonplaceholder.typicode.com/photos", data)
    .then((response) => {
      console.log("response:", response);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

//#endregion

// function passValues() {
//   const newAlbumId = document.getElementById("albumId").value;
//   const newTitle = document.getElementById("title").value;
//   localStorage.setItem("newAlbumId", newAlbumId);
//   localStorage.setItem("newTitle", newTitle);
//   console.log(newAlbumId, newTitle);
//   return false;
// }

// const saveBtn = document.getElementById("saveBtn");
// saveBtn.addEventListener("click", passValues);
