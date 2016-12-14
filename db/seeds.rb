# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


vancouver = City.create(name: 'Vancouver', location: [49, -90])
mexico = City.create(name: 'Mexico City', location: [20, -80])
City.create(name: 'Bangkok', location: [12, 102])
City.create(name: 'Delhi', location: [20, 20])
penh = City.create(name: 'Phnom Penh', location: [10, 105])

scott = Provider.create(username: 'Wilkinstagram')
jittle = Provider.create(username: 'Jittle')

Picture.create(provider: scott, city: penh, location: [10, 130], url: 'https://www.instagram.com/p/BNarqTdFeTQ/', title: 'World Housing picture')
Picture.create(provider: scott, city: mexico, url: 'https://www.instagram.com/p/BMH1l0hlpKO/', title: 'Mexi City Blvd')
Picture.create(provider: jittle, city: mexico, url: 'https://www.instagram.com/p/BMkrrhijw8c', title: 'Mexi City Museum')
Picture.create(provider: jittle, city: vancouver, url: 'https://www.instagram.com/p/BLEcGWcD6jA', title: 'coal harbour')
