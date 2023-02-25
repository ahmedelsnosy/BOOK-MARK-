let nameWebsite = document.getElementById("nameWebsite");
let urlWebsite = document.getElementById("urlWebsite");
let alertName = document.getElementById("alertName");
let alerturl = document.getElementById("alerturl");
let send = document.getElementById("send");
let displayAll = document.getElementById("display");
let mood = "create";
let temp;
particlesJS.load("particles-js", "particles.json", function () {
  console.log("callback - particles.js config loaded");
});

send.addEventListener("click", function () {
  if (nameWebsite.value == "") {
    alertName.classList.replace("d-none", "d-block");
  }
  if (urlWebsite.value == "") {
    alerturl.classList.replace("d-none", "d-block");
  } else {
    bookmark();
  }
});

let bookmarkContainer = [];
if (localStorage.getItem("bookMark") != null) {
  bookmarkContainer = JSON.parse(localStorage.getItem("bookMark"));
  clearForm();
  display();
}

function bookmark() {
  let book = {
    nameWebsite: nameWebsite.value,
    urlWebsite: urlWebsite.value,
  };

  if (mood == "create") {
    bookmarkContainer.push(book);
  } else {
    bookmarkContainer[temp] = book;
    mood = "create";
    send.innerHTML = "Add Book Mark";
  }
  localStorage.setItem("bookMark", JSON.stringify(bookmarkContainer));
  clearForm();
  display();
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Added Book Mark success",
    showConfirmButton: true,
    timer: 1500,
  });
}

function display() {
  let cartona = "";
  for (let i = 0; i < bookmarkContainer.length; i++) {
    cartona += `
        <div class="col-md-12 text-dark d-flex flex-wrap justify-content-between my-2">
        <h1 class="rounded-2 p-1 mx-2">${bookmarkContainer[i].nameWebsite}</h1> 
        <div class="row">
        <div class ="col-md-12">
         <button class="btn btn-group-sm btn-primary text-dark mx-2">
             <a class ="text-decoration-none text-white" target ="_blank" href="${bookmarkContainer[i].urlWebsite}"><i class="fa-sharp fa-solid fa-eye"></i> </a>
        </button>
        <button class="btn btn-danger" onclick="deleteItem(${i})"><i class="fa-solid fa-trash"></i></button>
        <button class="btn btn-warning" onclick="Update(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
        </div>
        
        </div>
       
        

        </div>
       `;
  }
  displayAll.innerHTML = cartona;
}

function deleteItem(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      bookmarkContainer.splice(index, 1);
      localStorage.setItem("bookMark", JSON.stringify(bookmarkContainer));
      display();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } else {
      Swal.fire("Cancel!", "Your file has been Cancelled.", "success");
    }
  });
}

function validation() {
  if (nameWebsite.value == null || urlWebsite.value == null) {
    alertName.classList.replace("d-none", "d-block");
    alerturl.classList.replace("d-none", "d-block");
  } else {
    console.log("a7a");
  }
}

let searchInput = document.getElementById("Search");
searchInput.addEventListener("keyup", function (e) {
  console.log(e.target.value);
  Search(e.target.value);
});

function Search(term) {
  var cartona = "";
  for (let i = 0; i < bookmarkContainer.length; i++) {
    if (
      bookmarkContainer[i].nameWebsite
        .toLowerCase()
        .includes(term.toLowerCase()) == true
    ) {
      cartona += `
        <div class="col-md-12 d-flex flex-wrap justify-content-between my-2">
        <h1 class="rounded-2 p-1 mx-2">${bookmarkContainer[i].nameWebsite}</h1> 
        <button class="btn btn-group-sm btn-primary text-dark mx-2">
             <a class ="text-decoration-none text-dark" target ="_blank" href="${bookmarkContainer[i].urlWebsite}">
             ${bookmarkContainer[i].nameWebsite} 
             </a>
        </button>
        <button class="btn btn-danger" onclick="deleteItem(${i})"><i class="fa-solid fa-trash"></i></button>
        <button class="btn btn-danger" onclick="Update(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
        </div>
       `;
    }
    displayAll.innerHTML = cartona;
  }
}

function clearForm() {
  (nameWebsite.value = ""), (urlWebsite.value = "");
}

function Update(i) {
  nameWebsite.value = bookmarkContainer[i].nameWebsite;
  urlWebsite.value = bookmarkContainer[i].urlWebsite;
  send.innerHTML = "Update";
  mood = "Update";
  temp = i;
}
