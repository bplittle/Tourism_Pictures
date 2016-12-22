class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.string :name
      t.float :location, array: true
      t.string :country
      t.string :state
      t.string :description
      t.timestamps null: false
    end
  end
end
