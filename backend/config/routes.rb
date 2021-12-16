Rails.application.routes.draw do
  # resources :lyrics
  
  resources :artists do
    resources :lyrics
  end
   
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
