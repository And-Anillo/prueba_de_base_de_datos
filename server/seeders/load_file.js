import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from "../conexion_db.js";

export async function loadCustomers() {
    const filePath = path.resolve('server/data/01-customers.csv');
    const customerss = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            customerss.push([
                row.customer_id,
                row.full_name,
                row.id_number,
                row.address,
                row.phone,
                row.email
            ]);
        })
        .on('end', async () => {
            try {
                const query = 'INSERT INTO customers (customer_id,full_name,id_number,address,phone,email) VALUES ?';
                const [results] = await pool.query(query, [customerss]);
                console.log(`customers loaded: ${results.affectedRows}`);
                resolve(`customers loaded: ${results.affectedRows}`);
            } catch (error) {
                console.error(`Error loading customers: ${error.message}`);
                reject(`Error loading customers: ${error.message}`);
            }
        })
        .on('error', (error) => {
            console.error(`Error reading CSV file: ${error.message}`);
            reject(`Error reading CSV file: ${error.message}`);
        });     
    });
}

export async function loadPlataforms(){
    const filePath = path.resolve('server/data/02-platforms.csv');
    const platforms = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (fila) => {
                platforms.push([
                    fila.platform_id,
                    fila.platform_name
                ]);
        })
        .on('end', async () => {
            try {
                const query = 'INSERT INTO platforms (platform_id,platform_name) VALUES ?';
                const [results] = await pool.query(query, [platforms]);
                console.log(`loaded platforms: ${results.affectedRows}`);
                resolve(`loaded platforms: ${results.affectedRows}`);
            } catch (error) {
                console.error(`Error loading platforms: ${error.message}`);
                reject(`Error loading platforms: ${error.message}`);
            }
        })
        .on('error', (error) => {
            console.error(`Error reading the CSV file: ${error.message}`);
            reject(`Error reading the CSV file: ${error.message}`);
        });     
    });
}

export async function loadInvoices() {
    const filePath = path.resolve('server/data/03-invoices.csv');
    const invoices = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            invoices.push([
                row.invoice_id,
                row.invoice_number,
                row.billing_period,
                row.amount_billed,
                row.amount_paid,
                row.customer_id
                ]);      
        })        
        .on('end', async () => {      
            try{
                const query = 'INSERT INTO invoices (invoice_id,invoice_number,billing_period,amount_billed,amount_paid,customer_id) VALUES ?';
                const [results] = await pool.query(query, [invoices]);
                console.log(`invoices loaded: ${results.affectedRows}`);
                resolve(`invoices loaded: ${results.affectedRows}`);
            }catch (error) {
                console.error(`Error loading : ${error.message}`);
                reject(`Error loading invoices: ${error.message}`);
            }
        })
        .on('error', (error) => {
            console.error(`Error reading CSV file: ${error.message}`);
            reject(`Error reading CSV file: ${error.message}`);
        });     
    });
}

export async function loadTransactions() {
    const filePath = path.resolve('server/data/04-transacciones.csv');
    const transactions= [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            transactions.push([
                row.transaction_id,
                row.transaction_code,
                row.transaction_date,
                row.amount,
                row.status,
                row.transaction_type,
                row.platform_id,
                row.invoice_id
                ]);      
        })        
        .on('end', async () => {      
            try{
                const query = 'INSERT INTO transactions (transaction_id,transaction_code,transaction_date,amount,status,transaction_type,platform_id, invoice_id) VALUES ?';
                const [results] = await pool.query(query, [transactions]);
                console.log(`transactions loaded: ${results.affectedRows}`);
                resolve(`transactions loaded: ${results.affectedRows}`);
            }catch (error) {
                console.error(`Error loading : ${error.message}`);
                reject(`Error loading transactions: ${error.message}`);
            }
        })
        .on('error', (error) => {
            console.error(`Error reading CSV file: ${error.message}`);
            reject(`Error reading CSV file: ${error.message}`);
        });     
    });
}