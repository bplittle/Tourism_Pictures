# == Schema Information
#
# Table name: providers
#
#  id         :integer          not null, primary key
#  username   :string
#  real_name  :string
#  home_city  :string
#  city_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Provider < ActiveRecord::Base

  has_many :pictures
  belongs_to :city
  
end
