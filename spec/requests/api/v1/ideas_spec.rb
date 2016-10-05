require 'rails_helper'

describe "Ideas Controller" do
  it "should return a list of 2 ideas" do
    idea = create(:idea, id: 1, title: "Ajax", body: "The unknown")
    idea2 = create(:idea, id: 2, title: "Call", body: "Call your mom")

    get '/api/v1/ideas'

    ideas = JSON.parse(response.body)

    expect(ideas.count).to eq(2)
    expect(ideas.first["id"]).to eq(2)
    expect(ideas.first["title"]).to eq("Call")
    expect(ideas.first["body"]).to eq("Call your mom")
    expect(ideas.first["quality"]).to eq("swill")

    expect(ideas.first["id"]).not_to eq(1)
    expect(ideas.first["title"]).not_to eq("Ajax")
    expect(ideas.first["body"]).not_to eq("The unknown")
  end
end
