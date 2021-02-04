'use strict';

const sql = require('mssql');

const config = {
  user: 'ReviewLogin',
  password: 'password12',
  connectionTimeout: 180,
  server: 'localhost',
  database: 'MovieRate'
};

const selectById = async (tableName, id = '') => {
  try {
    const pool = await sql.connect(config);
    return await pool.query(`SELECT * FROM ${tableName} ${id ? `WHERE ${tableName}Id = ${id}`: ''}`);
  } catch (e) {
    throw new Error('Database bad request: ' + e.toString());
  }
};

const tableToName = {
  Movie: 'MovieTitle',
  Genre: 'GenreName',
  Studio: 'StudioTitle',
  Director: 'DirectorName',
  Distributor: 'DistributorTitle'
}

const moviesFullInfo = async (tableName = 'Movie', id = 0)  => {
  try {
    const pool = await sql.connect(config);
    const res = {};
    res.movies = (await pool.query(`SELECT * FROM MoviesFullInfo ${id !== 0 ? `WHERE ${tableName}Id = ${id}`: ''}`)).recordset;
    res.title = res.movies[0][tableToName[tableName]];
    return res;
  } catch (e) {
    throw new Error('Database bad request: ' + e.toString());
  }
}

const mainPage = async () => {
  try {
    const pool = await sql.connect(config);
    const res = {title: 'Movie'};
    res.ethernalClassic = (await pool.query('SELECT * FROM EthernalClassic')).recordset;
    res.movies = (await moviesFullInfo()).movies;
    return res;
  } catch (e) {
    throw new Error('Database bad request: ' + e.toString())
  }
}

const postReview = async (data) => {
  try {
    const pool = await sql.connect(config);
    console.log(await pool.query(`EXEC PostReview ${data.login}, ${data.password}, ${data.rate}, ${data.MovieId}`));
  } catch (e) {
    throw new Error('Database bad request: ' + e.toString())
  }
}

const getAwards = async (pageSize, page) => {
  try {
    const pool = await sql.connect(config);
    return (await pool.query(`SELECT * FROM AwardsInfo WHERE AwardId BETWEEN ${pageSize * (page - 1) + 1} AND ${pageSize * page}`)).recordset;
  } catch (e) {
    throw new Error('Database bad request: ' + e.toString())
  }
}

const createUser = async (data) => {
  try {
    const pool = await sql.connect(config);
    return (await pool.query(`EXEC CreateUser ${data.login}, ${data.password}`));
  } catch (e) {
    throw new Error('Database bad request: ' + e.toString())
  }
}

const deleteUser = async (data) => {
  try {
    const pool = await sql.connect(config);
    return (await pool.query(`EXEC DeleteUser ${data.login}, ${data.password}`));
  } catch (e) {
    throw new Error('Database bad request: ' + e.toString())
  }
}

module.exports = {
  mainPage,
  moviesFullInfo,
  getAwards,
  postReview,
  createUser,
  deleteUser
}