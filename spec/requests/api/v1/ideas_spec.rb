require 'rails_helper'

describe "Ideas Controller" do
  it "should return a list of 2 ideas" do
    idea = create(:idea, id: 1, title: "Ajax", body: "The unknown")
    idea2 = create(:idea, id: 2, title: "Call", body: "Call your mom")

    get '/api/v1/ideas'

    ideas = JSON.parse(response.body)

    expect(ideas.first["id"]).to eq(2)
    expect(ideas.first["title"]).to eq("Call")
    expect(ideas.first["body"]).to eq("Call your mom")
    expect(ideas.first["quality"]).to eq("swill")

    expect(ideas.first["id"]).not_to eq(1)
    expect(ideas.first["title"]).not_to eq("Ajax")
    expect(ideas.first["body"]).not_to eq("The unknown")
  end

  it "should delete idea" do
    idea = create(:idea, id: 1, title: "Ajax", body: "The unknown")
    idea2 = create(:idea, id: 2, title: "Call", body: "Call your mom")

    delete '/api/v1/ideas/1'

    expect(response.body).to eq("")
  end

  it "should edit idea quality up" do
    idea = create(:idea, id: 1, title: "Ajax", body: "The unknown")

    get '/api/v1/ideas'

    ideas = JSON.parse(response.body)

    expect(ideas.first["id"]).to eq(1)
    expect(ideas.first["title"]).to eq("Ajax")
    expect(ideas.first["body"]).to eq("The unknown")
    expect(ideas.first["quality"]).to eq("swill")

    put '/api/v1/ideas/1/', params: {"type" => "up"}
    get '/api/v1/ideas'

    ideas = JSON.parse(response.body)

    expect(ideas.first["id"]).to eq(1)
    expect(ideas.first["title"]).to eq("Ajax")
    expect(ideas.first["body"]).to eq("The unknown")
    expect(ideas.first["quality"]).to eq("plausible")

    put '/api/v1/ideas/1/', params: {"type" => "up"}
    get '/api/v1/ideas'
    ideas = JSON.parse(response.body)

    expect(ideas.first["quality"]).to eq("genius")
  end

  it "should edit idea quality down" do
    idea = create(:idea, id: 1, title: "Ajax", body: "The unknown")

    get '/api/v1/ideas'

    ideas = JSON.parse(response.body)

    expect(ideas.first["id"]).to eq(1)
    expect(ideas.first["title"]).to eq("Ajax")
    expect(ideas.first["body"]).to eq("The unknown")
    expect(ideas.first["quality"]).to eq("swill")

    put '/api/v1/ideas/1/', params: {"type" => "up"}
    get '/api/v1/ideas'

    ideas = JSON.parse(response.body)

    expect(ideas.first["id"]).to eq(1)
    expect(ideas.first["title"]).to eq("Ajax")
    expect(ideas.first["body"]).to eq("The unknown")
    expect(ideas.first["quality"]).to eq("plausible")

    put '/api/v1/ideas/1/', params: {"type" => "down"}
    get '/api/v1/ideas'
    ideas = JSON.parse(response.body)

    expect(ideas.first["quality"]).to eq("swill")
  end

  it "should edit the title" do
    idea = create(:idea, id: 1, title: "Ajax", body: "The unknown")

    get '/api/v1/ideas'

    ideas = JSON.parse(response.body)

    expect(ideas.first["id"]).to eq(1)
    expect(ideas.first["title"]).to eq("Ajax")
    expect(ideas.first["body"]).to eq("The unknown")
    expect(ideas.first["quality"]).to eq("swill")

    put '/api/v1/ideas/1/', params: {"title" => "Nope"}
    get '/api/v1/ideas'

    ideas = JSON.parse(response.body)

    expect(ideas.first["id"]).to eq(1)
    expect(ideas.first["title"]).to eq("Nope")
    expect(ideas.first["body"]).to eq("The unknown")
    expect(ideas.first["quality"]).to eq("swill")
  end

  it "should edit the body" do
    idea = create(:idea, id: 1, title: "Ajax", body: "The unknown")

    get '/api/v1/ideas'

    ideas = JSON.parse(response.body)

    expect(ideas.first["id"]).to eq(1)
    expect(ideas.first["title"]).to eq("Ajax")
    expect(ideas.first["body"]).to eq("The unknown")
    expect(ideas.first["quality"]).to eq("swill")

    put '/api/v1/ideas/1/', params: {"body" => "The kind of known"}
    get '/api/v1/ideas'

    ideas = JSON.parse(response.body)

    expect(ideas.first["id"]).to eq(1)
    expect(ideas.first["title"]).to eq("Ajax")
    expect(ideas.first["body"]).to eq("The kind of known")
    expect(ideas.first["quality"]).to eq("swill")
  end
end
