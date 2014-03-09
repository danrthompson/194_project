SeniorProjectApp::Application.routes.draw do
  get "static_pages/index"

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'

  # match '/auth/:provider/callback' => "google#authenticate"
  # get 'test' => 'google#test'
  root to: 'homepage#homepage'
  get 'index' => 'mail#index'
  get 'compose_email' => 'mail#compose_email'
  post 'compose_email' => 'mail#compose_email_post'
  match '/label/:label_id' => 'mail#label'
  match '/email/:email_id' => 'mail#email'
  match '/manage_email_labels/:email_id' => 'mail#manage_email_labels'
  match '/manage_email_labels_post/:email_id' => 'mail#manage_email_labels_post'
  get 'homepage/testing_angular'

  # get 'api/get_labels/:user_id' => 'api#get_labels'
  # get 'api/get_threads/:label_id' => 'api#get_threads'
  # get 'api/get_emails/:conversation_id' => 'api#get_emails'
  # get 'api/send_email' => 'api#send_email'


  put 'api/labels/order'

  namespace :api do
    resources :labels, except: [:new, :edit]
  end


end
