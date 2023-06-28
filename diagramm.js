function getTable() {
    let table = document.getElementById("my-table");

    const headers = [];
    for (let i = 0; i < table.rows[0].cells.length; i++) {
        headers[i] = table.rows[0].cells[i].textContent;
    }

    let data = [];

    for (let i = 1; i < table.rows.length; i++) {
        const tableRow = table.rows[i];
        const rowData = {};

        for (let j = 0; j < tableRow.cells.length; j++) {
            rowData[headers[j]] = tableRow.cells[j].textContent;
        }

        data.push(rowData);
    }

    return data;
}

function createArr(Date, int_mode_y, int_mode_x) {

    let str_mode;
    let str_mode_date;

    if(int_mode_y == 0)
        str_mode = "Name";
    else if (int_mode_y == 1)
        str_mode = "Genres";

    if(int_mode_x == 0)
        str_mode_date = "Main Story";
    else if (int_mode_x == 1)
        str_mode_date = "Main + Sides";
    else if (int_mode_x == 2)
        str_mode_date = "Completionist";

    let outMassForDate_x = {};
    if(int_mode_y == 1) {
        for(let i = 0; i < Date.length; i++) {
            if(outMassForDate_x[Date[i][str_mode]] == null) {
                outMassForDate_x[Date[i][str_mode]] = parseInt(Date[i][str_mode_date]);
            } else {
                if (outMassForDate_x[Date[i][str_mode]] < parseInt(Date[i][str_mode_date])) {
                    outMassForDate_x[Date[i][str_mode]] = parseInt(Date[i][str_mode_date]);
                }
            }
        }
    } else {
        for(let i = 0; i < Date.length; i++) {
            outMassForDate_x[Date[i][str_mode]] = parseInt(Date[i][str_mode_date]);
        }
    }


    console.log(outMassForDate_x);
    return outMassForDate_x;
}

function drawLinearGrafic(map) {
    let width = 800;
    let height = 600;

    let marginX = 50;
    let marginY = 50;

    let svg = d3.select(".curr-graff")
        .append("svg")
        .attr("height", height)
        .attr("width", width)

    let min = 0;
    let max = 400;

    let xAxisLen = width - 2 * marginX;
    let yAxisLen = height - 2 * marginY;
    let data = Object.entries(map);


    let xScale = d3.scaleBand()
        .domain(data.map(function(d) {
            return d[0];
        }))
        .range([0, xAxisLen])

    let yScale = d3.scaleLinear()
        .domain([min, max])
        .range([yAxisLen, 0]);

    let xAxis = d3.axisBottom(xScale);

    let yAxis = d3.axisLeft(yScale)

    svg.append("g")
        .attr("transform", `translate(${marginX + 50}, ${height - marginY - 200})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)");

    svg.append("text")
        .attr("x", (marginX + 200) / 2)
        .attr("y",(height + 40) / 2)
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .attr("transform", `rotate(-90, ${marginX / 2}, ${height / 2})`)
        .text("Затраченное время, часов");

    svg.append("g")
        .attr("transform", `translate(${marginX + 50}, ${marginY - 200})`)
        .attr("class", "y-axis")
        .call(yAxis);

    svg.append("path")
        .attr("transform", `translate(${marginX + 50 + ((yAxisLen - 150) / Object.keys(map).length)}, ${marginY - 200})`)
        .datum(data.map(function(d) {return d[1]}))
        .attr("fill", "none")
        .attr("stroke", "#4A0851")
        .attr("stroke-width", 1)
        .attr("stroke-linecap", "round")
        .attr("stroke-dasharray", "0,0")
        .attr("d", d3.line()
            .x(function(d, i) { return xScale(data.map(function (d) {return d[0]})[i]); })
            .y(function(d) { return yScale(d); })
            .curve(d3.curveCardinal.tension(0.3))
        );
}

function drawGistDiagramm(map) {
    let width = 800;
    let height = 600;
    let marginX = 55;
    let marginY = 75;

    let svg = d3.select(".curr-graff")
        .append("svg")
        .attr("height", height)
        .attr("width", width)

    let min = 0;
    let max = 350;

    let xAxisLen = width - 2 * marginX;
    let yAxisLen = height - 2 * (marginY);
    let data = Object.entries(map);

    let scaleX = d3.scaleBand()
        .domain(data.map(function(d) {
            return d[0];
        }))
        .range([0, xAxisLen])
        .padding(0.2);

    let scaleY = d3.scaleLinear()
        .domain([min, max])
        .range([yAxisLen, 0]);

    // Создание осей

    let axisY = d3.axisLeft(scaleY)     // Вертикальная

    let axisX = d3.axisBottom(scaleX); // Горизонтальная
    svg.append("g")
        .attr("transform", `translate(${marginX}, ${height - marginY - 120})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)");

    svg.append("text")
        .attr("x", (marginX + 150) / 2)
        .attr("y",(height - 10) / 2)
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .attr("transform", `rotate(-90, ${marginX / 2}, ${height / 2})`)
        .text("Затраченное время, часов");

    svg.append("g")
        .attr("transform", `translate(${marginX}, ${marginY - 120})`)
        .call(axisY);

    // Цвета столбиков
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    // Создание и отрисовка столбиков гистограммы
    let g = svg.append("g")
        .attr("transform", `translate(${ marginX}, ${ marginY - 120})`)
        .selectAll(".rect")
        .data(data)
        .enter().append("rect")
        .attr("x", function(d) { return scaleX(d[0]); })
        .attr("width", scaleX.bandwidth())
        .attr("y", function(d) { return scaleY(d[1]); })
        .attr("height", function(d) { return yAxisLen - scaleY(d[1]); })
        .attr("fill", function(d) { return color(d[0]); })
        .attr("rx", 3)
        .attr("ry", 3);

}

function buttonCheck() {
    const radioButtons = document.querySelectorAll('.block-01 input[type="radio"]');

    let inpMassRad = [];

    for (let i = 0; i < radioButtons.length; i++) {
        console.log(radioButtons[i].checked);
        inpMassRad.push(radioButtons[i].checked);
    }

    if(inpMassRad[0] == true)
        input_a = 0;
    else
        input_a = 1;

    if(inpMassRad[2] == true)
        input_b = 0;
    else if(inpMassRad[3] == true)
        input_b = 1;
    else if(inpMassRad[4] == true)
        input_b = 2;
    else
        input_b = 2;
}

function setVisibleElementGraf(isVisible) {
    grafDiv[0].style.display = isVisible ? "block" : "none";
}

function drawGrafic(input_a, input_b) {

    let tt = 1;
    console.log(tt); tt++;

    let data = getTable();

    let newDate = createArr(data, input_a, input_b);

    if(input_a == 1) {
        drawLinearGrafic(newDate);//by Genres
    } else {
        drawGistDiagramm(newDate);//by Name
    }
}

let grafDiv = document.getElementsByClassName('block-graf');

let isVisible = false;
setVisibleElementGraf(isVisible);

let input_a = 0;
let input_b = 0;

let buttDraw = document.getElementById('butt-graf');
let graf_container = document.getElementById('graf-container');

buttDraw.addEventListener('click', () => {
    setVisibleElementGraf(true);

    let mainGraf = document.getElementsByClassName('curr-graff');
    mainGraf[0].remove();

    let mainGraf2 = document.createElement("div");
    mainGraf2.className = "curr-graff";

    graf_container.insertBefore(mainGraf2, graf_container.firstChild);

    buttonCheck();

    drawGrafic(input_a, input_b);
});

