# == Schema Information
#
# Table name: pictures
#
#  id          :integer          not null, primary key
#  city_id     :integer
#  provider_id :integer
#  location    :float            is an Array
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  url         :string
#  tags        :string           is an Array
#  title       :string
#  description :string
#  metadata    :json
#

class Picture < ActiveRecord::Base

  belongs_to :city
  belongs_to :provider

  before_save :set_location

  protected

  def set_location
    if !location && self.city
      self.location = self.city.location
    end
  end


end
