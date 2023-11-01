// ********** Fetch Data for landing page **********
// #region
const url = "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=100";

fetch(url)
  .then((res) => {
    console.log("resolved", res);
    return res.json();
  })
  .then((data) => {
    for (i = 1; i <= data.length; i++) {
      let imgSrc = data[i - 1].thumbnailUrl;
      let id = data[i - 1].id;
      let albumId = data[i - 1].albumId;
      let title = data[i - 1].title;
      createNewCard(imgSrc, id, albumId, title);
    }
  })
  .catch((err) => {
    console.log("error", err);
  });
// #endregion

// *************** function to create new card *****************
// #region

let createNewCard = (imgSrc, id, albumId, title) => {
  const cards = document.getElementById("cards");
  const cardDiv = document.createElement("div");
  cardDiv.classList.add(
    "card",
    "p-2",
    "mb-5",
    "d-flex",
    "flex-column",
    "justify-content-between"
  );

  // append image
  const img = document.createElement("img");
  img.src = imgSrc;
  img.classList.add("card-img-top");
  cardDiv.append(img);

  // append ID
  const h5 = document.createElement("h5");
  h5.innerText = `Card ID: ${id}, Album ID: ${albumId}`;
  h5.classList.add("card-title");
  cardDiv.append(h5);

  // append title
  const p = document.createElement("p");
  p.innerText = title;
  p.classList.add("card-text");
  cardDiv.append(p);

  // append edit button
  const btn = document.createElement("a");
  btn.id = "editBtn";
  btn.innerText = "Edit";
  btn.classList.add("btn", "btn-primary", "d-block", "mb-2");
  btn.setAttribute("href", `selected_image.html?id=${id}`);
  cardDiv.append(btn);

  // append delete button
  const btn2 = document.createElement("a");
  btn2.setAttribute("href", "#");
  btn2.innerText = "Delete";
  btn2.classList.add("btn", "btn-primary", "d-block");
  cardDiv.append(btn2);
  btn2.addEventListener("click", deleteBtnFun);

  // append created card to page
  cards.append(cardDiv);

  // #endregion

  // *****delete button event and confirmation****
  //#region
  function deleteBtnFun() {
    if (window.confirm("Do you really want to delete?")) {
      alert("you have successfully deleted this card");
      cardDiv.remove();
    }
  }
};
//#endregion

// ******Retrieve input data from 2nd page******
//#region

localStorage.getItem("newAlbumId");
localStorage.getItem("newTitle");
//#endregion
