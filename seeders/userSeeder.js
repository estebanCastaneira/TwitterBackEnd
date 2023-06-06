/**
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 *
 */
require("dotenv").config();
const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const Tweet = require("../models/Tweet");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  /*=========== LOOP USERS ================*/
  const users = [];
  const tweets = [];
  const password = await bcrypt.hash("123", 12);
  try {
    for (let i = 0; i < process.env.SEEDER_TOTAL_USERS; i++) {
      const lastname = faker.name.lastName();
      const firstname = faker.name.firstName();
      const user = new User({
        firstname: firstname,
        lastname: lastname,
        username: `@${lastname}`,
        email: `${firstname}${lastname}@email.com`,
        password: password,
        bio: faker.lorem.paragraph(),
        avatar: faker.image.avatar(),
        //following:,  // TODO
        //followers:, // TODO
        createdAt: faker.date.past(),
        updatedAt: new Date(),
        // tweets: , // TODO
      });

      for (let i = 0; i < Math.floor(Math.random() * 20) + 1; i++) {
        // TWEETS random entre 1 y 20
        const tweet = new Tweet({
          content: faker.lorem.sentence(10),
          author: user,
          likes: user,
          createdAt: faker.date.past()
        });
        user.tweets.push(tweet);
        tweets.push(tweet);
      }
      users.push(user);
    }
  } catch (error) {
    console.log(error);
  }

  for (const tweet of tweets) {
    const N = Math.floor(Math.random() * process.env.SEEDER_TOTAL_USERS) + 1; // Likes random entre 1 y Total USERS
    tweet.likes = _.sampleSize(users, [(n = N)]);
  }

  for (const user of users) {
    const N = Math.floor((Math.random() * process.env.SEEDER_TOTAL_USERS) / 3) + 1; // FOLLOWING random entre 1 y (Total USERS)/3
    const followings = _.sampleSize(users, [(n = N)]);
    const followedByUser = followings.filter((u) => u.id !== user.id); // nos aseguramos que los followings no coincidan con el user
    user.following.push(...followedByUser); // user.following = followedByUser;
    for (const following of followedByUser) {
      following.followers.push(user);
    }
  }

  await Tweet.insertMany(tweets);
  await User.insertMany(users);

  console.log("[Database] Se corrió el seeder de Users.");
};
