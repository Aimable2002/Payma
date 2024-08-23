import mysql from 'mysql';

const connectDatabase = () => {
    try {
        const connection = mysql.createConnection({
            host:  'localhost',
            user: 'root',
            password: '',
            database: 'payma',
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
