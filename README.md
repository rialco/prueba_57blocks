# **Prueba 57 blocks**

## **Intro**

La prueba fue realizada con las siguientes tecnologias:

- Node JS
- Express
- PostgreSQL
- JWT

## **Deployment**

El proyecto se encuentra desplegado en **Heroku** a traves del siguiente link: https://taller01-57blocks.herokuapp.com/

## **Setup local**

En caso de desplegar el proyecto en un ambiente local se incluyeron migraciones para la creacion de las tablas necesarias.
Utilizar el comando DATABASE_URL=postgres://USUARIO:PASSWORD@localhost:5432/NOMREDB npm run migrate up

## **Rutas**

### Auth

- Login
  - POST : https://taller01-57blocks.herokuapp.com/auth/login

### Users

- Create a new user.
  - POST : https://taller01-57blocks.herokuapp.com/users/signup

### Pokemons

- Retrieve all pokemons.
  - GET : https://taller01-57blocks.herokuapp.com/pokemons/
- Retrieve pokemons created by the user given the user id.
  - GET : https://taller01-57blocks.herokuapp.com/pokemons/user/:id - Get pokemons created by user
- Create a new pokemon.
  - POST : https://taller01-57blocks.herokuapp.com/pokemons/ - Create new pokemon
- Update one of the pokemon's fields given the pokemon's id.
  - PATCH : https://taller01-57blocks.herokuapp.com/pokemons/:id - Update pokemon
