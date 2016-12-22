class CreateProviders < ActiveRecord::Migration
  def change
    create_table :providers do |t|
      t.string :username
      t.string :real_name
      t.references :city
      t.json :links, default: {}
      t.timestamps null: false
    end
  end
end
