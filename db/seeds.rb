# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


vancouver = City.create(name: 'Vancouver', country: 'Canada', location: [49, -125], description: 'This is a city description alskdfjlaksdfklajsdlfkj lorum ipsum')
montreal = City.create(name: 'Montreal', country: 'Canada', location: [49, -80], description: 'This is a city description alskdfjlaksdfklajsdlfkj lorum ipsum')
toronto = City.create(name: 'Toronto', country: 'Canada', location: [40, -90], description: 'This is a city description alskdfjlaksdfklajsdlfkj lorum ipsum')

scott = Provider.create(username: 'Wilkinstagram', city: vancouver, links: {instagram: 'http://www.wilkinstagram.com', website: 'http://www.wilkinstagram.com'})
jittle = Provider.create(username: 'Jittle', city: vancouver, links: {instagram: 'http://www.wilkinstagram.com', website: 'http://www.wilkinstagram.com'})
francois = Provider.create(username: 'Francois', city: vancouver, links: {instagram: 'http://www.wilkinstagram.com', website: 'http://www.wilkinstagram.com'})


Picture.create(provider: scott, city: vancouver, url: 'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/14565029_1136644063119976_6039926153752346624_n.jpg', title: 'World Housing picture')
Picture.create(provider: scott, city: vancouver, url: 'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/14676733_1200155523377007_4474335305058484224_n.jpg', title: 'Mexi City Blvd')
Picture.create(provider: jittle, city: vancouver, url: 'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/14504740_342845162739229_3498698342349668352_n.jpg?ig_cache_key=MTM3OTQxOTQ5MjgzMjk3MjU3Mg%3D%3D.2', title: 'Mexi City Museum')
Picture.create(provider: jittle, city: vancouver, url: 'https://www.instagram.com/p/BLEcGWcD6jA', title: 'coal harbour')
