class CreateLyrics < ActiveRecord::Migration[6.1]
  def change
    create_table :lyrics do |t|
      t.string :content
      t.string :songName
      t.string :albumName
      t.integer :releaseYear
      t.string :genre
      t.belongs_to :artist
      t.timestamps
    end
  end
end
