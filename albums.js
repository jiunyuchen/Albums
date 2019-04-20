//Get the object from the json file
var mydata = JSON.parse(albums);

// change the null nationality into Unknown
for (var idx = 0; idx < mydata.length; idx++) {
  if (mydata[idx].nationality === null) {
    mydata[idx].nationality = "Unknown"
  }
}


// use for loop to get all the information form json
// and make a string and put the string into html file as dropdwonlist Options

function selectYearStr() {
  var selectYearStr = "";
  // allow users to select all
  selectYearStr = selectYearStr + '<option value = All>' + 'All' + '</option>'
  document.getElementById("selectYear").innerHTML = selectYearStr;
    //ad all the options into selectYear dropdownlist
    for (var i = 0; i < mydata.length; i++) {
      selectYearStr = selectYearStr + '<option value="' + mydata[i].year + '">' + mydata[i].year + '</option>'
      document.getElementById("selectYear").innerHTML = selectYearStr; //Returns selectYear string to html file as year dropdwonlist
    }
}

function selectCountryStr() {
  var selectCountry = [];
    for (i = 0; i < mydata.length; i++) {
      if (mydata[i].nationality !== "Unknown") { //deal with the null problem
        if (selectCountry.indexOf(mydata[i].nationality) === -1) {
          selectCountry.push(mydata[i].nationality)

        }
      }
    }
  //console.log(selectCountry) = selectCountry = ["United States", "Canada", "United Kingdom"]

  var selectCountryStr = ""
  // return the result into html file as nationality dropdwonlist
  // allow users to choose all
  selectCountryStr = selectCountryStr + '<option value =  All>' + 'All' + '</option>'
  document.getElementById("selectCountry").innerHTML = selectCountryStr;
    for (i = 0; i < selectCountry.length; i++) {
      selectCountryStr = selectCountryStr + '<option value ="' + selectCountry[i] + '">' + selectCountry[i] + '</option>';
      document.getElementById("selectCountry").innerHTML = selectCountryStr;
    }
}



// filter out all the data that users choose
function filter() {
  // return drop-down list value from html file
  var year = document.getElementById("selectYear").value;
  var nationality = document.getElementById("selectCountry").value;

  // executing when people choose all years with all nationalities
  if (year === 'All' && nationality === 'All') {
    // add table headers
    var tableHeader = '<tr><th>Year</th><th>Artist</th><th>Nationality</th><th>Album</th><th>More Information about the Album</th></tr>'
    document.getElementById("hitsTable").innerHTML = tableHeader;

      // using for loop to add table contents
      for (var i = 0; i < mydata.length; i++) {
        //using 'document.getElementById().innerHTML' to retrun will replace the table header
        /*var tableContent = tableContent + '<tr><td>' + mydata[i].year + '</td>' + '<td>' + mydata[i].artist + '</td>' + '<td>' + mydata[i].nationality + '</td>' + '<td>' + mydata[i].album + '</td></tr>'
          //Returns tableContent string to html file
          document.getElementById("hitsTable").innerHTML = tableContent;*/
        // so I declare a new variable(elm) and create a new Element into the variable (createElement)
        // using appendChild() method to create children of table

        //Before creating the new element, the hyperlink of each album is created
        var rowHyperLink = 'https://en.wikipedia.org/wiki/' + mydata[i].album.toString();
        rowHyperLink = ' onclick=' + '\" window.location= \'' + rowHyperLink + '\'\"'
        //console.log(rowHyperLink) = onclick=" window.location= 'https://en.wikipedia.org/wiki/Calypso'" (the first one)

        // add contents into table row by row
        var elm = document.createElement('tr');
        elm.innerHTML = '<tr><td>' + mydata[i].year + '</td>'
                          + '<td>' + mydata[i].artist + '</td>'
                          + '<td>' + mydata[i].nationality + '</td>'
                          + '<td>' + mydata[i].album + '</td>'
                          + '<td' + rowHyperLink +'>' + mydata[i].album + '</td></tr>' //add hyperlink
        hitsTable.appendChild(elm);
      }
  }  // between if and else if cannot have ';' or it doesn't work (};)

  //executing when users choose all years and a specific nationality
  else if (year === 'All' && nationality !== 'All') {
    // add table headers
    var tableHeader = '<tr><th>Year</th><th>Artist</th><th>Nationality</th><th>Album</th><th>More Information about the Album</th></tr>'
    document.getElementById("hitsTable").innerHTML = tableHeader;

    // filter out the data with the nationality that users prefer
    var searchNationalityResult = mydata.filter(function(record) {
      return record.nationality === nationality;
    });

      // using for loop to add table contents
      for (var i = 0; i < searchNationalityResult.length; i++) {

        //the hyperlink of each album is created
        var rowHyperLink = 'https://en.wikipedia.org/wiki/' + searchNationalityResult[i].album.toString();
        rowHyperLink = ' onclick=' + '\" window.location= \'' + rowHyperLink + '\'\"'

        // add contents into table row by row
        var elm = document.createElement('tr');
        elm.innerHTML = '<tr><td>' + searchNationalityResult[i].year + '</td>'
                          + '<td>' + searchNationalityResult[i].artist + '</td>'
                          + '<td>' + searchNationalityResult[i].nationality + '</td>'
                          + '<td>' + searchNationalityResult[i].album + '</td>'
                          + '<td' + rowHyperLink +'>' + searchNationalityResult[i].album + '</td></tr>' //add hyperlink
        hitsTable.appendChild(elm);
      }
  }

  //executeing when users choose a specific year and all nationalities
  else if (year !== 'All' && nationality === 'All') {
    // add table headers
    var tableHeader = '<tr><th>Year</th><th>Artist</th><th>Nationality</th><th>Album</th><th>More Information about the Album</th></tr>'
    document.getElementById("hitsTable").innerHTML = tableHeader;

    // filter out the data with the year that users prefer
    var searchYearResult = mydata.filter(function(record) {
      return record.year.toString() === year;   // the year data in json file are numbers so we need to transform them into strings
    });

      // using for loop to add table contents
      for (var i = 0; i < searchYearResult.length; i++) {

        //the hyperlink of each album is created
        var rowHyperLink = 'https://en.wikipedia.org/wiki/' + searchYearResult[i].album.toString();
        rowHyperLink = ' onclick=' + '\" window.location= \'' + rowHyperLink + '\'\"'

        // add contents into table row by row
        var elm = document.createElement('tr');
        elm.innerHTML = '<tr><td>' + searchYearResult[i].year + '</td>'
                          + '<td>' + searchYearResult[i].artist + '</td>'
                          + '<td>' + searchYearResult[i].nationality + '</td>'
                          + '<td>' + searchYearResult[i].album + '</td>'
                          + '<td' + rowHyperLink +'>' + searchYearResult[i].album + '</td></tr>'
        hitsTable.appendChild(elm);
      }
  }

  //executing when users choose a specific year and a specific nationality
  else if (year !== 'All' && nationality !== 'All') {
    // add table headers
    var tableHeader = '<tr><th>Year</th><th>Artist</th><th>Nationality</th><th>Album</th><th>More Information about the Album</th></tr>'
    document.getElementById("hitsTable").innerHTML = tableHeader;

    // filter out the data with the year and the natioanlity that users prefer
    var searchResult = mydata.filter(function(record) {
      return (record.year.toString() == year && record.nationality == nationality);
    });

        // using for loop to add table contents
        for (var i = 0; i < searchResult.length; i++) {

          //the hyperlink of each album is created
          var rowHyperLink = 'https://en.wikipedia.org/wiki/' + searchResult[i].album.toString();
          rowHyperLink = ' onclick=' + '\" window.location= \'' + rowHyperLink + '\'\"'

          // add contents into table row by row
          var elm = document.createElement('tr');
          elm.innerHTML = '<tr><td>' + searchResult[i].year + '</td>'
                            + '<td>' + searchResult[i].artist + '</td>'
                            + '<td>' + searchResult[i].nationality + '</td>'
                            + '<td>' + searchResult[i].album + '</td>'
                            + '<td' + rowHyperLink +'>' + searchResult[i].album + '</td></tr>'
          hitsTable.appendChild(elm);
        }
  }
};
