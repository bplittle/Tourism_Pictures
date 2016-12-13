class CreateProviders < ActiveRecord::Migration
  def change
    create_table :providers do |t|
      t.string :username
      t.string :real_name
      t.string :home_city
      t.references :city

      t.timestamps null: false
    end
  end
end
