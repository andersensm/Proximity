$(document).ready(function() {

  function initializeRows(posts) {
    var latestPosts = posts.reverse();
    var rowsToAdd = [];
    for (var i = 0; i < 4; i++) {
      rowsToAdd.push(createNewRow(latestPosts[i]));
    }
    $("#recentJobs").append(rowsToAdd);
  }

  function getPosts() {
    $.get("/api/posts", function(data) {
      posts = data;
      initializeRows(posts);
      // displayPost(posts);
      console.log(posts)
    });
  }

  function createNewRow(posts) {
    var tBody = $("tbody")
    var tRow = $("<tr>").addClass("jobRow")
    var titleTd = $("<td>").text(posts.jobTitle).addClass("jobData")
    var companyTd = $("<td>").text(posts.companyName).addClass("jobData")
    var cityTd = $("<td>").text(posts.city).addClass("jobData")
    var stateTd = $("<td>").text(posts.state).addClass("jobData")
    var viewbtn = $("<td>")
    var btn = $('<input />', {
      type: "button",
      value: "View",
      class: "btn-viewPost",
      "data-toggle": "modal",
      "data-target": "#viewJobPostInfo",
      on: {
        click: function() {
          // console.log ( posts.id );
          displayPost(posts.id)
        }
      }
    })
    viewbtn.append(btn)
    tRow.append(titleTd, companyTd, cityTd, stateTd, viewbtn)
    tBody.append(tRow);
  }

  getPosts();

  /// click action for view to pop up with modal on the job info
  function displayPost(id) {
    console.log("hi")
    queryURL = 'http://localhost:8080/api/posts/' + id
    console.log(queryURL)
    $.ajax({
      url: queryURL,
      method: "GET",
    }).done(function(results) {
      console.log(results)
      var applybtn = $('<input />', {
        type: "button",
        value: "Apply",
        class: "apply-btn",
        on: {
          click: function() {
            // window.open(postLink,'_blank');
            window.open("http://www.facebook.com", '_blank');
            console.log("click to go to url")
          }
        }
      })
      $("#viewJobPostTitle").text(results.jobTitle)
      $("#apply-btn-area").html(applybtn)
      // var jbTit = results.jobTitle
      var cmpName = results.companyName
      var jobDesc = results.jobDescription
      var jobQual = results.jobQualification
      var addInfo = results.additionalInfo
      var adr1 = results.address
      var adr2 = results.city
      var adr3 = results.state
      var adr4 = results.zipCode
      var fullAddress = adr1 + " " + adr2 + " " + adr3 + " " + adr4
      var createdAt = results.created_at
      var updatedAt = results.updated_at

      var placeDetailsModal = ('<div>' + cmpName + '<br>' + '<br>' + '<h5>Job Description: </h5>' + jobDesc + '<br>' + '<br>' + '<h5>Qualifications: </h5>' + jobQual + '<br>' + '<br>' + '<h5>Additional Information: </h5>' + addInfo + '<br>' + '<br>' + '<h5>Job Address: </h5>' + adr1 + '<br>' +  adr2 + ', ' + adr3 + ' ' + adr4 + '</div>');
      $(".modal-body").html(placeDetailsModal)
    })
  };

  $("#resultsPageTitleText").text("Your search results for " + "(variable)" + " jobs in " + "(variable)")

  $("#recruiter-btn").on("click", function() {
    console.log("registering button click")
    window.location = "/recruiter";
  })

  $(".btn-success").click(function() {
    starJob();
  });

  function starJob() {
    $.post("/api/people", function(data) {
      console.log(data);
    });
    console.log("You starred a job");
  }

  function unstarJob() {
    console.log("You unstarred a job");
  }
})
