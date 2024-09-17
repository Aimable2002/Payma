// import mysql from 'mysql';

// const connectDatabase = () => {
//     try {
//         const connection = mysql.createConnection({
//             host:  'localhost',
//             user: 'root',
//             password: '',
//             database: 'payma',
//         });

//         connection.connect((err) => {
//             if (err) {
//                 console.error('Failed to connect to the database:', err);
            
//                 return;
//             }

//             console.log('Connected to the database');
            
//         });
//         return connection;
//     } catch (error) {
        
//         console.error('Failed to connect to the database:', error);
//     }

// };

// export default connectDatabase;




import pkg from 'pg';
const { Pool } = pkg;

const connectDatabase = () => {
    try {
        const pool = new Pool({
            host: process.env.POSTGRESQL_HOST,
            user: process.env.POSTGRESQL_USER, // PostgreSQL user
            password: process.env.POSTGRESQL_PASSWORD,      // Your PostgreSQL password
            database: process.env.POSTGRESQL_DB, // Your database name
            max: 20, // Maximum number of connections in the pool
            idleTimeoutMillis: 30000, // Time a connection can be idle before being closed
            connectionTimeoutMillis: 2000 // Time to wait for a connection to be established
        });

        // Test the connection
        pool.query('SELECT NOW()', (err, res) => {
            if (err) {
                console.error('Failed to connect to the PostgreSQL database:', err);
                return;
            }
            console.log('Connected to the PostgreSQL database at:', res.rows[0].now);
        });

        return pool;
    } catch (error) {
        console.error('Failed to connect to the PostgreSQL database:', error);
    }
};

export default connectDatabase;

