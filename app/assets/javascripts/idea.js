$(document).ready(function(){
  fetchIdeas();
  createIdea();
  deleteIdea();
  upVoteIdea();
  downVoteIdea();
  editIdeaTitle();
  editIdeaBody();
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
      .then(clearInputs)
      .fail(manageError)
    })
  }

  function clearInputs(){
    $("#idea-title").val(""),
    $("#idea-body").val("")
  }

  function deleteIdea(){
    $(".idea-list").on("click", "#delete-button", function(){
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
    return $("<div class='idea row well' data-up='up' data-down='down' data-all='"
          + idea.title +" "+ idea.body +"' data-id='"
          + idea.id
          + "'><p>Created at: "
          + idea.created_at
          + "</p><p contenteditable='true' class='input-field-title'>"
          + idea.title
          + "</p><p contenteditable='true' class='input-field-body'>"
          + idea.body
          + "</p><p>"
          + idea.quality
          + "</p>"
          + "<div class='quality-buttons'>"
          + "<button name='button-up' class='thumbs-up btn btn-primary'>Upvote</button>"
          + "<button name='button-down' class='thumbs-down btn btn-danger'>Downvote</button>"
          + "</div>"
          + "<div class='text-right'>"
          + "<button id='delete-button' name='button-delete' class='btn btn-secondary text-right' value='Delete'>Delete</button>"
          + "</div>"
          + "</div>")
  }

  function renderIdeas(ideaInfo){
    $(".idea-list").html(ideaInfo)
  }

  function renderIdea(ideaInfo){
    $(".idea-list").prepend(ideaInfo)
  }

  function upVoteIdea(){
    $(".idea-list").on("click", ".thumbs-up", function(){
      var $ideaUpVote = $(this).closest(".idea")
      $.ajax({
        url: "/api/v1/ideas/" + $ideaUpVote.data("id") + "/" + $ideaUpVote.data("up"),
        type: "put"
      }).then(fetchIdeas)
      .fail(manageError)
    })
  }

  function downVoteIdea(){
    $(".idea-list").on("click", ".thumbs-down", function(){
      var $ideaDownVote = $(this).closest(".idea")
      $.ajax({
        url: "/api/v1/ideas/" + $ideaDownVote.data("id") + "/" + $ideaDownVote.data("down"),
        type: "put"
      }).then(fetchIdeas)
      .fail(manageError)
    })
  }

  function editIdeaTitle(){
    $(".idea-list").on("blur", ".input-field-title", function(){
      var $editIdeaTitle = $(this).closest(".idea")
      var editTitleParams = {
        title: $(this).text()
      }
      $.ajax({
        url: "/api/v1/ideas/" + $editIdeaTitle.data("id"),
        type: "put",
        data: editTitleParams
      }).then(fetchIdeas)
      .fail(manageError)
    })
  }

  function editIdeaBody(){
    $(".idea-list").on("blur", ".input-field-body", function(){
      var $editIdeaBody = $(this).closest(".idea")
      var editBodyParams = {
        body: $(this).text()
      }
      $.ajax({
        url: "/api/v1/ideas/" + $editIdeaBody.data("id"),
        type: "put",
        data: editBodyParams
      }).then(fetchIdeas)
      .fail(manageError)
    })
  }

  function manageError(error){console.log(error)}
