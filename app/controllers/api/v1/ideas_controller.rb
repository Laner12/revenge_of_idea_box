class Api::V1::IdeasController < ApplicationController

  def index
    render json: Idea.all.order(created_at: :desc)
  end

  def create
    render json: Idea.create(idea_params)
  end

  def update
    idea = Idea.find(params["id"])
    if params["type"] == "up"
      up_vote_incrementer(idea)
    else
      down_vote_incrementer(idea)
    end
  end

  def destroy
    Idea.find(params["id"]).destroy
  end

  private

  def up_vote_incrementer(idea)
    if idea.quality == "swill"
      idea.update_attributes(quality: "plausible")
    elsif idea.quality == "plausible"
      idea.update_attributes(quality: "genius")
    end
  end

  def down_vote_incrementer(idea)
    if idea.quality == "genius"
      idea.update_attributes(quality: "plausible")
    elsif idea.quality == "plausible"
      idea.update_attributes(quality: "swill")
    end
  end

  def idea_params
    params.permit(:title, :body)
  end
end
