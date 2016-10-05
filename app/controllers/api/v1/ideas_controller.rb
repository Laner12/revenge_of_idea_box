class Api::V1::IdeasController < ApplicationController

  def index
    render json: Idea.all.order(created_at: :desc)
  end

  def create
    render json: Idea.new(idea_params)
  end

  private

  def idea_params
    params.permit(:title, :body)
  end
end
