// from data.js

var tableData = data;

var table = d3.select("#ufo-table");

var columns = [
    { head: 'Date', cl: 'center', html: r => { return r.datetime; } },
    { head: 'City', cl: 'center', html: r => { return r.city } },
    { head: 'State', cl: 'center', html: r => { return r.state } },
    { head: 'Country', cl: 'center', html: r => { return r.country } },
    { head: 'Duration', cl: 'num', html: r => { return r.durationMinutes } },
    { head: 'Shape', cl: 'center', html: r => { return r.shape } },
    { head: 'Comments', cl: 'left', html: r => { return r.comments } }
];


table.append('thead').append('tr')
    .selectAll('th')
    .data(columns).enter()
    .append('th')
    .text(h => {return h.head});

    
// Uncomment once the remove part is working in the submit fn

table.append('tbody')
    .selectAll('tr')
    .data(tableData).enter()
    .append('tr')
    .selectAll('td')
    .data(function(row, i) {
        return columns.map(c => {
            var cell = {};
            d3.keys(c).forEach(k => {
                cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
            });
            return cell;
        });
    }).enter()
    .append('td')
    .html(i => {return i.html} )
    .attr(c => {return c.cl} );


/////////////////////////////////////////////////////////
//////////////      Filter Button        ////////////////
/////////////////////////////////////////////////////////

var submit = d3.select("#filter-btn");

submit.on("click", function() {
    
    d3.event.preventDefault();

    var filteredData = tableData;

    var dateFilter = d3.select("input#datetime");
    var inputDate = dateFilter.property("value");

    var cityFilter = d3.select("input#city");
    var inputCity = cityFilter.property("value");

    var stateFilter = d3.select("input#state");
    var inputState = stateFilter.property("value");

    var countryFilter = d3.select("input#country");
    var inputCountry = countryFilter.property("value");

    var shapeFilter = d3.select("input#shape");
    var inputShape = shapeFilter.property("value");

    // Ignore empty filter fields
    // Could probably loop...
    if (inputDate !== '') {
        var filteredData = filteredData.filter(
            entry => entry.datetime === inputDate
        )
    };
    if (inputCity !== '') {
        var filteredData = filteredData.filter(
            entry => entry.city === inputCity
        )
    };
    if (inputState !== '') {
        var filteredData = filteredData.filter(
            entry => entry.state === inputState
        )
    };
    if (inputCountry !== '') {
        var filteredData = filteredData.filter(
            entry => entry.country === inputCountry
        )
    };
    if (inputShape !== '') {
        var filteredData = filteredData.filter(
            entry => entry.shape === inputShape
        )
    };

    console.log(filteredData);

    // remove old, unfiltered table
    var oldData = d3.select("tbody");
    oldData.remove();

    // repopulate with filtered data
    table.append('tbody')
    .selectAll('tr')
    .data(filteredData).enter()
    .append('tr')
    .selectAll('td')
    .data(function(row, i) {
        return columns.map(c => {
            var cell = {};
            d3.keys(c).forEach(k => {
                cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
            });
            return cell;
        });
    }).enter()
    .append('td')
    .html(i => {return i.html} )
    .attr(c => {return c.cl} );

});
