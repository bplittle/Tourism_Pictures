# == Schema Information
#
# Table name: cities
#
#  id         :integer          not null, primary key
#  name       :string
#  location   :float            is an Array
#  country    :string
#  state      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class City < ActiveRecord::Base

  has_many :pictures
  has_many :providers


end
