# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  content_type :json
  Contact.all.to_json
end

get '/contacts/:id' do
  content_type :json
  Contact.find(params[:id]).to_json
end

patch '/contacts/:id' do
  Contact.update(
    name: params[:name],
    email: params[:email],
    phone: params[:phone]
    ).save
end

post '/contacts' do
  Contact.create(
    name: params[:name],
    email: params[:email],
    phone: params[:phone]
    )
end

delete '/contacts/:id' do
  Contact.find(params[:id]).destroy
end