class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.references :city
      t.references :provider
      t.float :location, array: true
      t.timestamps null: false
      t.string :url
      t.string :tags, array: true
      t.string :title
      t.string :description
      t.json :metadata
    end
  end
end
