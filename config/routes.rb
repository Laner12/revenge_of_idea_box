Rails.application.routes.draw do
  root 'base#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/ideas', to: 'ideas#index'
      post '/ideas', to: 'ideas#create'
      delete '/ideas/:id', to: 'ideas#destroy'
      put '/ideas/:id/:type', to: 'ideas#update'
      put '/ideas/:id', to: 'ideas#update'
    end
  end
end
