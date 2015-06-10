class CreateContact < ActiveRecord::Migration
  
  def change
  
    create_table :contacts do |t|
      t.string :name, :email, :phone
      t.timestamps null: false
    end
  
  end

end