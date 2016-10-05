$(document).ready(function(){
  fetchIdeas();
  createIdea();
})

  function fetchIdeas(){
    $.ajax({
      url: "/api/v1/ideas",
      type: "get"
    }).then(collectIdeas)
    .then(renderIdeas)
    .then(manageError)
  }

  function collectIdeas(ideaInfo){
    return ideaInfo.map(createIdeaHTML)
  }

  function createIdea(){
    $("#create-idea").on('click', function(){
      var ideaParams = {
        idea: {
          title: $("#idea-title").val(),
          body: $("#idea-body").val()
        }
      }
      $.ajax({
        url: "/api/v1/ideas",
        type: "post",
        data: ideaParams
      }).then(createIdeaHTML)
      .then(renderIdea)
      .then(manageError)
    })
  }

  function createIdeaHTML(idea){
    return $("<div class='idea' id='number-"
          + idea.id
          + "'><h6>Created at: "
          + idea.created_at
          + "</h6><p>"
          + idea.title
          + "</p><p>"
          + idea.body
          + "</p>"
          + "<button id='thumbs-up' name='button-up' class='btn btn-primary'>Upvote</button>"
          + "<button id='thumbs-down' name='button-down' class='btn btn-danger'>Downvote</button>"
          + "</div>")
  }

  function renderIdeas(ideaInfo){
    $("#idea-list").html(ideaInfo)
  }

  function renderIdea(ideaInfo){
    $("#idea-list").prepend(ideaInfo)
  }

  function manageError(error){console.log(error)}
