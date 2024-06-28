import mysql from 'mysql';

const connectDatabase = () => {
    try {
        const connection = mysql.createConnection({
            host: 'localhost', // or '127.0.0.1'
            user: 'root', // default username for XAMPP
            password: '', // default password for XAMPP
            database: 'payma'
        });

        connection.connect((err) => {
            if (err) {
                console.error('Failed to connect to the database:', err);
                return;
            }

            console.log('Connected to the database');
        });

        return connection;
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
};

export default connectDatabase;
