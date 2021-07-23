# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

artists = Artist.create([{artistName: "Weezer"}, {artistName: "The Gap Band"}, {artistName: "Britney Spears"}])
lyrics = Lyric.create([{content: "I talked for hours to your wanted photograph.", songName: "The World has Turned and Left Me Here", albumName:"The Blue Album", releaseYear: 1994, genre: "Rock", artist_id: 1}, {content: "You light my fire / I feel alive with you, baby / You blow my mind / I'm satisfied.", songName: "Outstanding", albumName:"The Gap Band IV", releaseYear: 1982, genre: "R & B", artist_id: 2}, {content: "It might seem like a crush / But it doesn't mean that I'm serious / 'Cause to lose all my senses / That is just so typically me", songName: "Opps!... I Did it Again", albumName:"Opps!... I Did it Again", releaseYear: 2000, genre: "Pop", artist_id: 3}])