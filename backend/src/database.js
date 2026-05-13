const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcrypt')

const db = new sqlite3.Database('./data.db', (err) => {
    if(err) {
        return console.error(`ERROR: ${err.message}`)
    }

    console.log('Connected successfully to the database.')
})

db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON;', (err) => {
        if(err) {
            console.log(`ERROR: ${err.message}`)
        }
    })

    const userQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            name TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `

    const salesQuery = `
        CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            amount TEXT NOT NULL,
            description TEXT,
            date TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `

    db.run(userQuery, [], function(err) {
        if(err) {
            return console.error(`ERROR: ${err.message}`)
        }

        console.log('USERS TABLE CREATED/ALREADY EXISTS.')
    })

    db.run(salesQuery, [], function(err) {
        if(err) {
            return console.error(`ERROR: ${err.message}`)
        }

        console.log('SALES TABLE CREATED/ALREADY EXISTS.')
    })

    async function seedAdmin() {
        bcrypt.hash('Admin123!', 10, (err, hash) => {
            db.run(`INSERT OR IGNORE INTO users (email, password_hash, name) VALUES (?, ?, ?)`,
                ["admin", hash, "Mark Lawrence"], function(err) {
                    if(err) {
                        return
                    }
                }
            )
        })
    }

    seedAdmin()
})

db.on('error', (err) => {
    console.error(`ERROR: ${err.message}`)
})

module.exports = db