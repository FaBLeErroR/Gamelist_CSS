let table = document.getElementById("my-table");
let butt_sort = document.getElementById("butt-sort");
let butt_filter = document.getElementById("butt-filter");

const headers = [];
for (let i = 0; i < table.rows[0].cells.length; i++) {
   headers[i] = table.rows[0].cells[i].textContent;
}

console.log(headers);

let data = [];

for (let i = 1; i < table.rows.length; i++) {
   const tableRow = table.rows[i];
   const rowData = {};

   for (let j = 0; j < tableRow.cells.length; j++) {
      rowData[headers[j]] = tableRow.cells[j].textContent;
   }

   data.push(rowData);
}

console.log(data);
let data_1 = data;

let opt_mass = [];

opt_mass[0] = 0;
opt_mass[1] = 0;
opt_mass[2] = 0;

// "по убыванию?"
let opt_bool_mass = [];

opt_bool_mass[0] = false;
opt_bool_mass[1] = false;
opt_bool_mass[2] = false;


function sortDataByName(data, headers, opt_mass, opt_bool_mass) {
   data.sort((a, b) => {
      for(let i = 0; i < opt_mass.length; i++) {

         let outpInd = opt_mass[i] - 1;
         outpInd = parseInt(outpInd);

         if((outpInd >= 0) && (outpInd < 5)) {
            let navOpt = headers[outpInd];

            let nameA = a[navOpt].toLowerCase();
            let nameB = b[navOpt].toLowerCase();

            if((!(isNaN(parseInt(nameA)) || !isFinite(nameA))) &&
                (!(isNaN(parseInt(nameB)) || !isFinite(nameB))) ) {

               nameA = parseFloat(nameA);
               nameB = parseFloat(nameB);
            }

            let bool = opt_bool_mass[i];

            if (nameA < nameB) {
               if (bool == true) { return 1 } else { return -1 }
            }
            else if (nameA > nameB) {
               if (bool == true) { return -1 } else { return 1 }
            }
         }
      }
      return 0;
   });
}

function createTable(data) {
   let table = document.createElement("table");
   table.id = 'my-table';

   let headerRow = document.createElement("tr");
   let headerNames = ["Name", "Genres", "Main Story", "Main + Sides", "Completionist"];
   for (let i = 0; i < headerNames.length; i++) {
      let headerCell = document.createElement("th");
      headerCell.textContent = headerNames[i];
      headerRow.appendChild(headerCell);
      headerRow.className = 'title';
   }
   table.appendChild(headerRow);

   for (let j = 0; j < data.length; j++) {
      let row = document.createElement("tr");
      let item = data[j];
      let keys = Object.keys(item);
      for (let k = 0; k < keys.length; k++) {
         let cell = document.createElement("td");
         cell.textContent = item[keys[k]];
         row.appendChild(cell);
      }
      table.appendChild(row);
   }

   return table;
}

function ReqSort() {
   sortDataByName(data, headers, opt_mass, opt_bool_mass);
   data_1 = data;
   table.remove();

   var newTable = createTable(data);

   var container = document.getElementById("table-container");
   container.insertBefore(newTable, container.firstChild);

   table = document.getElementById("my-table");
}

butt_sort.addEventListener('click', () => {
   check_checkboxes_1();

   ReqSort();
   ReqFilter();
});

let strMass = ["", "", 0, 0, 0, 0, 0, 0];

function setSortTable(date, strMass) {
   let outDate = [];

   for(let j = 3; j < strMass.length; j++) {
      if(strMass[j] == "") strMass[j] = 0;
      else strMass[j] = parseInt(strMass[j]);
   }
   for(let i = 0; i < date.length; i++) {
      let bool = true;

      if(strMass[0] != "") {
         //console.log('strMass[0] = ' + strMass[0] );
         if (date[i].Name.indexOf(strMass[0]) === -1) {
            bool = false;
         }
      }
      if(strMass[1] != "") {
         //console.log('strMass[1] = ' + strMass[1] );
         if (date[i].Genres.indexOf(strMass[1]) === -1) {
            bool = false;
         }
      }
      if(strMass[2] != 0) {
         if(date[i]['Main Story'] < strMass[2]) {
            bool = false;
         }
      }
      if(strMass[3] != 0) {
         if(date[i]['Main Story'] > strMass[3]) {
            bool = false;
         }
      }
      if(strMass[4] != 0) {
         if(date[i]['Main + Sides'] < strMass[4]) {
            bool = false;
         }
      }
      if(strMass[5] != 0) { // ?
         if(date[i]['Main + Sides'] > strMass[5]) {
            //console.log(date[i]['Visitor'] + " > " + strMass[4]);
            bool = false;
         }
      }
      if(strMass[6] != 0) {
         if(date[i]['Completionist'] < strMass[6]) {
            bool = false;
         }
      }
      if(strMass[7] != 0) {
         if(date[i]['Completionist'] > strMass[7]) {
            bool = false;
         }
      }

      if(bool == true) {
         outDate.push(date[i]);
      }
   }

   return outDate;
}

bad_news = document.getElementById('bad-news');
bad_news.style.display = "none";


function ReqFilter() {
   const inputs = document.querySelectorAll('.block-02 .right-edge-1 input[type="text"]');
   strMass = [];
   for (let i = 0; i < inputs.length; i++) {
      strMass.push(inputs[i].value);
   }

   console.log('strMass = ' + strMass);

   let inDate = setSortTable(data_1, strMass);


   table.remove();

   var newTable;

   if(inDate.length > 0) {
      bad_news.style.display = "none";

      newTable = createTable(inDate);
      var container = document.getElementById("table-container");
      container.insertBefore(newTable, container.firstChild);

      table = document.getElementById("my-table");
   }
   else {
      bad_news.style.display = "block";
   }
}

butt_filter.addEventListener('click', () => {
   check_checkboxes_1();
   ReqSort();
   ReqFilter();
});

let allElemMass = [];

allElemMass[0] = 'No';
allElemMass[1] = 'Name';
allElemMass[2] = 'Genres';
allElemMass[3] = 'Main Story';
allElemMass[4] = 'Main + Sides';
allElemMass[5] = 'Completionist';

function getNumElem(name) {
   let sortOpt = document.getElementById("sort-opt");
   let l1 = sortOpt.getElementsByClassName(name)[0];
   let select = l1.getElementsByTagName("select")[0];
   return select;
}

function reqInputElements(indDesel) {

   console.log('itsElementFree = ' + itsElementFree);

   if(opt_mass[0] == 0 && opt_mass[1] == 0 && opt_mass[2] == 0) {
      itsElementFree = [0, 0, 0, 0, 0];
   }

   let a = getNumElem('l1');
   let b = getNumElem('l2');
   let c = getNumElem('l3');

   for(let j = 0; j < 3; j++) {
      if(j == 0)
         a.innerHTML = '';
      if(j == 1)
         b.innerHTML = '';
      if(j == 2)
         c.innerHTML = '';

      for(let i = 0; i < 6; i++) {
         if ((itsElementFree[i] != 1) || (opt_mass[j] == i)) {

            let option = document.createElement("option");
            option.value = i;
            option.text = allElemMass[i];

            if(opt_mass[j] == i) {
               option.selected = true;
               console.log('opt_mass[' + j + '] = ' + i);
            }

            if(j == 0)
               a.appendChild(option);
            if(j == 1)
               b.appendChild(option);
            if(j == 2)
               c.appendChild(option);
         }
      }
   }
}



let itsElementFree = [0, 0, 0, 0, 0];


let bufMass = [0, 0, 0];


const selectElement1 = document.querySelector('.block-03 .l1 select');

selectElement1.addEventListener('change', function() {
   let selectedValue = selectElement1.value;
   opt_mass[0] = selectedValue;

   if(selectedValue != 0) {
      itsElementFree[selectedValue] = 1;
   } else {
      itsElementFree[bufMass[0]] = 0;
   }

   bufMass[0] = selectedValue;
   reqInputElements(1);
});

const selectElement2 = document.querySelector('.block-03 .l2 select');

selectElement2.addEventListener('change', function() {
   let selectedValue = selectElement2.value;
   console.log('opt_mass[1] = ' + selectedValue);
   opt_mass[1] = selectedValue;

   if(selectedValue != 0) {
      itsElementFree[selectedValue] = 1;
   } else {
      itsElementFree[bufMass[1]] = 0;
   }

   bufMass[1] = selectedValue;
   reqInputElements(2);
});

const selectElement3 = document.querySelector('.block-03 .l3 select');

selectElement3.addEventListener('change', function() {
   let selectedValue = selectElement3.value;
   console.log('opt_mass[2] = ' + selectedValue);
   opt_mass[2] = selectedValue;

   if(selectedValue != 0) {
      itsElementFree[selectedValue] = 1;
   } else {
      itsElementFree[bufMass[2]] = 0;
   }

   bufMass[2] = selectedValue;
   reqInputElements(3);
});

const checkboxes = document.querySelectorAll('.block-03 input[type="checkbox"]');
let checkedValues = [];

check_checkboxes_1();

function check_checkboxes_1() {
   checkedValues = [];
   checkboxes.forEach(checkbox => {
      checkedValues.push(checkbox.checked);
   });

   opt_bool_mass = checkedValues;
}