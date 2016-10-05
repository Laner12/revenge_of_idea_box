require "rails_helper"

describe "Create idea", :type => :feature, :js => true do
  it "fills in thought details and creates idea" do
    visit "/"

    expect(page).to have_css("#idea-title")
    expect(page).to have_css("#idea-body")
    expect(page).to have_css("#create-button")

    fill_in "idea-title", :with => "Light Bulb"
    fill_in "idea-body", :with => "This is gonna be big."
    click_button "Save"
    
    within('#idea-list') do
      expect(page).to have_content("Light Bulb")
      expect(page).to have_content("This is gonna be big.")
    end
  end
end
