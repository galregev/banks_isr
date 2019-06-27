// Fetch Function.
function fe(url, name, branch) {

    document.getElementById("x").appendChild(loading);
    return fetch(
      url + `/${name}${branch !== undefined && branch !== "" ? "/" + branch : ""}`
    );
}

// Loading Div.
var loading = document.createElement("DIV");
var theDiv = `<div id="load" class="spinner" role="status">
                  <img src="img/logo.png" />
                  <span class="sr-only">Loading...</span>
                </div>`;
loading.innerHTML = theDiv;

// Get names of all banks.
let banks_array = [];
let branch_array = [];

function getNames(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(theData => {
        let reg = new RegExp("↵", "g");
        if (banks_array.includes(theData.Bank_Name[0].trim()) === false) {
          banks_array.push(
            theData.Bank_Name[0]
              .split("↵")
              .join("")
              .trim()
          );
        }
      });
    })
    .catch(err => {
      console.error("Error! " + err);
    });
}

function getBranchs(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(theData => {
        let reg = new RegExp("↵", "g");
        if (branch_array.includes(theData.Branch_Name[0].trim()) === false) {
          branch_array.push(
            theData.Branch_Name[0]
              .split("↵")
              .join("")
              .trim()
          );
        }
      });
    })
    .catch(err => {
      console.error("Error! " + err);
    });
}

// Delete from the string the double quets and the BackSlash's.
function getData(query) {
  let newq = query
    .replace(/\\/g, "")
    .split('"')
    .join("");
  if (newq == "" || newq == " ") {
    newq = "לא נמצא מידע";
  }
  return newq;
}

// Get all (Up to 30).
let getAllBtn = document.getElementById('getAll');

//EventLisnter for GetAll.
getAllBtn.addEventListener('click', () => {
    
    fetch('http://localhost:3000/api')
    .then(response => response.json())
    .then(data => {
        if (data.length < 1) {
            document.getElementById("x").innerHTML = `<h1 class="text-center">לא נמצאו בנקים התואמים לחיפוש</h1>`;
          }
          document.getElementById("x").innerHTML = "";
          console.log(data.length);
          for (let i = 0; i < 30; i++) {
            var markup4 = `
            <div class="col-3 mx-auto">
                <div class="card text-white bg-primary mb-3">
                    <div class="card-header" style="font-family: 'alef"> שם הסניף: ${getData(
                      JSON.stringify(data[i].Branch_Name[0])
                    )}</div>
                    <div class="card-body">
                        <h5 class="card-title">${getData(
                          JSON.stringify(data[i].Bank_Name[0])
                        )}</h5>
                        <ul class="list-group list-group-flush">
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].Bank_Code[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].Branch_Address[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].Branch_Code[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].City[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].Zip_Code[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].POB[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].Telephone[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].Fax[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].Free_Tel[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].Handicap_Access[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].day_closed[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].Branch_Type[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].Date_Open[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].Date_Closed[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].Merge_Bank[0])
                            )}</li>
                            <li style="color: #000" class="list-group-item">${getData(
                              JSON.stringify(data[i].Merge_Branch[0])
                            )}</li>
                      </ul>
                    </div>
                </div>
            </div>
            `;
            document.getElementById("x").innerHTML += markup4;
        }
            
            //console.log(data.data[i]);
                            
    })
    .catch(err => console.error(err));

});

// Event Lisnter for substr search in modal.
const sendbtn = document.getElementById("sendsubstr");
sendbtn.addEventListener("click", () => {

    // Final Results.
    var finalName;
    var finalBrach;

  // Get value of substr.
  let substr = document.getElementById("substr").value;

  // Get the Result div.
  let result = document.getElementById("sub_result");

  fe("http://localhost:3000/api/search", substr, undefined)
    .then(response => response.json())
    .then(data => {
      document.getElementById('load').style.display = 'none';
      var theFirstStep = document.getElementById("first_step");
      theFirstStep.style.display = "none";
      //Markup for results.
      const markUp = `
                <ul id="names" class="list-group mt-5">
                    ${data
                      .map((b, i) => {
                        return (
                          '<li class="list-group-item modal-item text-right">' +
                          b +
                          "</li>"
                        );
                      })
                      .join("")}
                </ul>
            `;

      result.innerHTML = markUp; // Insert the data for result div.
      // FirstStep UL LI.
      var theul = document.getElementById("names");
      var theFirstStep = document.getElementById("first_step");
      var theSecondStep = document.getElementById("second_step");

      // The second Step Inputs.
      var input_name = document.getElementById("branchName");
      var input_number = document.getElementById("branchNumber");

      var items = theul.getElementsByTagName("li");
      theul.addEventListener("click", function(e) {
        console.log(e.target.innerHTML);
        for (let i = 0; i < items.length; i++) {
          if (items[i].innerText !== e.target.innerHTML) {
            items[i].classList.add("d-none");
          }
          items[i].classList.add("bg-primary");
        }
        theFirstStep.style.display = "none";
        theSecondStep.classList.remove("d-none");
        input_name.value = e.target.innerHTML;
        finalName = e.target.innerHTML;
      });

      // Event Lisnter to secondStep submit.
      let second_step_btn = document.getElementById("sendSecondStep");

      second_step_btn
        .addEventListener("click", () => {
          if (input_name.value !== "" && input_number.value !== "") {
            fe(
              "http://localhost:3000/api/nan",
              input_name.value,
              input_number.value
            )
              .then(response => response.json())
              .then(data => {
                    var markUp2 = `
                    <ul id="numbers" class="list-group mt-5">
                        ${data
                          .map((b, i) => {
                            return (
                              '<li class="list-group-item modal-item text-right">' +
                              b +
                              "</li>"
                            );
                          })
                          .join("")}
                    </ul>
                    `;
                
                theSecondStep.innerHTML = markUp2;

                // The Second step UL LI.
                var Secondul = document.getElementById("numbers");

                // Event Lisnter for SecondStep.
                var Seconditems = Secondul.getElementsByTagName("li");
                Secondul.addEventListener("click", function(e) {
                    document.getElementById('FinalBTN').classList.remove('d-none');
                    Secondul.classList.remove('mt-5');
                    Secondul.classList.add('mt-1');
                  console.log(e.target.innerHTML);
                  for (let i = 0; i < Seconditems.length; i++) {
                    if (Seconditems[i].innerText !== e.target.innerHTML) {
                        Seconditems[i].classList.add("d-none");
                    }
                    Seconditems[i].classList.add("bg-primary");
                  }
                  finalBrach = e.target.innerHTML;
                });
              })
          }
        })

        // Event Lisnter for finalBTN.
        var final_btn = document.getElementById('FinalBTN');
        var modal = document.getElementById('myModal');
        final_btn.addEventListener('click', () => {

            modal.style.display = 'none';
            fe('http://localhost:3000/api/final', finalName, finalBrach)
            .then(response => response.json())
            .then(data => {
                var markup3 = `
                <div class="col-10 col-sm-7 mx-auto">
                    <div class="card text-white bg-primary mb-3">
                        <div class="card-header" style="font-family: 'alef"> שם הסניף: ${getData(
                          JSON.stringify(data[0].Branch_Name[0])
                        )}</div>
                        <div class="card-body">
                            <h5 class="card-title">${getData(
                              JSON.stringify(data[0].Bank_Name[0])
                            )}</h5>
                            <ul class="list-group list-group-flush">
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].Bank_Code[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].Branch_Address[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].Branch_Code[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].City[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].Zip_Code[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].POB[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].Telephone[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].Fax[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].Free_Tel[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].Handicap_Access[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].day_closed[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].Branch_Type[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].Date_Open[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].Date_Closed[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].Merge_Bank[0])
                                )}</li>
                                <li style="color: #000" class="list-group-item">${getData(
                                  JSON.stringify(data[0].Merge_Branch[0])
                                )}</li>
                          </ul>
                        </div>
                    </div>
                </div>
                `;
                document.getElementById("x").innerHTML = markup3;
            })
            .catch(err => console.error(err));

        });

    })
    .catch( err => console.error(err));
});

// Event Lisnter for wich li clicked.
var ul = document.getElementById("names");
ul.addEventListener("click", () => {
  var target = getEventTarget(event);
  alert(target.innerHTML);
});

// Event Lisnter for search button in auto complete.
const searchbtn = document.getElementById("sendAuto"); //The Search btn.
searchbtn.addEventListener("click", () => {
  // Get the inputs values.
  let bankname = document.getElementById("My-input").value;
  let branchname = document.getElementById("My-input2").value;

  // Msg span in the form.
  let msg = document.getElementById("msg");

  // Vaild the inputs.
  if (
    bankname == "" ||
    bankname == " " ||
    branchname == "" ||
    branchname == " "
  ) {
    msg.innerHTML = "אנא מלא את כל השדות";
  }

  // Fetch the RESTful API for the bank details.
  fe("http://localhost:3000/api/auto", bankname, branchname)
    .then(response => response.json())
    .then(data => {
      if (data.msg) {
        document.getElementById("x").innerHTML = `<h1 class="text-center">לא נמצאו בנקים התואמים לחיפוש</h1>`;
      }
      const resp = data;
      if (data.length < 1) {
        document.getElementById("x").innerHTML = `<h1 class="text-center">לא נמצאו בנקים התואמים לחיפוש</h1>`;
      }
      document.querySelector(".spinner").style.display = "none";
      document.getElementById("x").innerHTML = "";
      console.log(data.length);
      for (let i = 0; i < data.length; i++) {
        var markup = `
        <div class="col-10 col-sm-7 mx-auto">
            <div class="card text-white bg-primary mb-3">
                <div class="card-header" style="font-family: 'alef"> שם הסניף: ${getData(
                  JSON.stringify(resp[i].Branch_Name[0])
                )}</div>
                <div class="card-body">
                    <h5 class="card-title">${getData(
                      JSON.stringify(resp[i].Bank_Name[0])
                    )}</h5>
                    <ul class="list-group list-group-flush">
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].Bank_Code[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].Branch_Address[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].Branch_Code[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].City[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].Zip_Code[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].POB[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].Telephone[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].Fax[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].Free_Tel[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].Handicap_Access[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].day_closed[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].Branch_Type[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].Date_Open[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].Date_Closed[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].Merge_Bank[0])
                        )}</li>
                        <li style="color: #000" class="list-group-item">${getData(
                          JSON.stringify(resp[i].Merge_Branch[0])
                        )}</li>
                  </ul>
                </div>
            </div>
        </div>
        `;
        //document.getElementById("x").innerHTML = markup;
        //console.log(data.data[i]);
      }
    })
    .catch(error => console.error(error));
});

getNames("http://localhost:3000/api/names");
getBranchs("http://localhost:3000/api/branchs");
autocomplete(document.getElementById("My-input"), banks_array);
autocomplete(document.getElementById("My-input2"), branch_array);
