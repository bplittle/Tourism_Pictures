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

require 'test_helper'

class PictureTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
