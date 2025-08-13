import express from "express"
import mysql from "mysql2/promise"

//pool for conection with data_base
export const pool = mysql.createPool({
    host: "localhost",
    database: "pd_andersson_vargas_caiman",
    port: "3306",
    user: "root",
    password: "",
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
})

//funtion for checking the conection is correct
async function laProvacion() {
    try {
        const connection = await pool.getConnection();
        console.log('Connection to the database successful');
        connection.release();
    } catch (error) {
        console.error('Error connecting to database:', error.message);
    }
}
laProvacion()