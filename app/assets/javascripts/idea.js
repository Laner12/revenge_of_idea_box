$(document).ready(function(){
  fetchIdeas();
  createIdea();
  deleteIdea();
  upVoteIdea();
  downVoteIdea();
})

  function fetchIdeas(){
    $.ajax({
      url: "/api/v1/ideas",
      type: "get"
    }).then(collectIdeas)
    .then(renderIdeas)
    .fail(manageError)
  }

  function collectIdeas(ideaInfo){
    return ideaInfo.map(createIdeaHTML)
  }

  function createIdea(){
    $("#create-button").on("click", function(){
      var ideaParams = {
        title: $("#idea-title").val(),
        body: $("#idea-body").val()
      }
      $.ajax({
        url: "/api/v1/ideas",
        type: "post",
        data: ideaParams
      }).then(createIdeaHTML)
      .then(renderIdea)
      .fail(manageError)
    })
  }

  function deleteIdea(){
    $("#idea-list").on("click", "#delete-button", function(){
      var $ideaId = $(this).closest(".idea")
      $.ajax({
        url: "/api/v1/ideas/" + $ideaId.data("id"),
        type: "delete"
      }).then(function(){
        $ideaId.remove()
      }).fail(manageError)
    })
  }

  function createIdeaHTML(idea){
    return $("<div class='idea row well' data-id='"
          + idea.id
          + "'><p>Created at: "
          + idea.created_at
          + "</p><p>"
          + idea.title
          + "</p><p>"
          + idea.body
          + "</p><p>"
          + idea.quality
          + "</p>"
          + "<div class='quality-buttons'>"
          + "<button id='thumbs-up' name='button-up' class='btn btn-primary'>Upvote</button>"
          + "<button id='thumbs-down' name='button-down' class='btn btn-danger'>Downvote</button>"
          + "</div>"
          + "<div class='text-right'>"
          + "<button id='delete-button' name='button-delete' class='btn btn-secondary text-right' value='Delete'>Delete</button>"
          + "</div>"
          + "</div>")
  }

  function renderIdeas(ideaInfo){
    $("#idea-list").html(ideaInfo)
  }

  function renderIdea(ideaInfo){
    $("#idea-list").prepend(ideaInfo)
  }

  function manageError(error){console.log(error)}
