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
Utilizar el comando:

```
DATABASE_URL=postgres://USUARIO:PASSWORD@localhost:5432/NOMREDB npm run migrate up
```

## **Rutas**

La ruta de auth proporciona un JWT que debe usarse como Bearer token al momento de hacer consultas en las rutas de pokemons

### Auth

- Login
  - POST : https://taller01-57blocks.herokuapp.com/auth/login
  - body {
    email: string, password: string
    }

### Users

- Create a new user.
  - POST : https://taller01-57blocks.herokuapp.com/users/signup
  - body {
    name: string, email: string, password: string
    }

### Pokemons

- Retrieve all pokemons.
  - GET : https://taller01-57blocks.herokuapp.com/pokemons/
- Retrieve pokemons created by the user given the user id.
  - GET : https://taller01-57blocks.herokuapp.com/pokemons/user/:id
- Create a new pokemon.
  - POST : https://taller01-57blocks.herokuapp.com/pokemons/
  - body {
    name: string, public: boolean
    }
- Update one of the pokemon's fields given the pokemon's id.
  - PATCH : https://taller01-57blocks.herokuapp.com/pokemons/:id
