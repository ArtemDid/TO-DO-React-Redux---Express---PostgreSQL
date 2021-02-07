const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_database',
  password: '123456',
  port: 5432,
  ssl: false
});



const getToDO = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM public.todo ORDER BY "idtodo" ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { login, password } = body

      pool.query('INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *', [login, password], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new user has been added: ${results.rows[0].idUser}`)
      });

  })
}

const createTodo = (body) => {
  return new Promise(function (resolve, reject) {
    const { description } = body
      pool.query('INSERT INTO public.todo(description) VALUES ($1) returning *', [description], (error, results) => {
        if (error) {
          reject(error)
        }
        try{
          resolve(`A new todo has been added: ${results.rows[0].idtodo}`)
        }
        catch{
          resolve(`Todo not found`);
        }
      });

  })
}


const checkUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { login, password } = body

      pool.query('SELECT * FROM public.users where login = ($1) and password = ($2)', [login, password], (error, results) => {
        if (error) {
          reject(error)
        }
        try{
          resolve(`A new user has been founded: ${results.rows[0].idUser}`)
        }
        catch{
          resolve(`User not found`);
        }
      });

  })
}


const deleteTodo = (idTodo) => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(idTodo)
    pool.query('SELECT * FROM deletetodo($1)', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      try{
        if (results.rows[0].result) resolve(`ToDo deleted with ID: ${id}`)
        else resolve(`ToDo is not found`)
      }
      catch{
        resolve(`ToDo is not found`)
      }
    })
  })
}

const updateTodo = (body) => {
  return new Promise(function (resolve, reject) {
    const { idtodo, description } = body;
    pool.query('select * from updatetodo($1, $2)', [idtodo, description], (error, results) => {
      if (error) {
        reject(error)
      }
      try{
        if (results.rows[0].result) 
        {
          resolve(`ToDo deleted with ID: ${idtodo}`)
        }
        else resolve(`ToDo is not found`)
      }
      catch{
        resolve(`Error ToDo is not found`)
      }
    })
  })
}


module.exports = {
  getToDO,
  updateTodo,
  createTodo,
  createUser,
  checkUser,
  deleteTodo
}