class Artist < ApplicationRecord
    has_many :lyrics
    accepts_nested_attributes_for :lyrics
end
