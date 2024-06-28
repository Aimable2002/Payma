import connectDatabase from "../database/connectDatabase.js";

const connection = connectDatabase();

// Function to create the table
// export const createTable = () => {
//     const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS users (
//             userId INT AUTO_INCREMENT PRIMARY KEY, 
//             userName VARCHAR(20)
//         )
//     `;
//     connection.query(createTableQuery, (err, result) => {
//         if (err) {
//             console.error('Failed to create table:', err);
//             return;
//         }
//         console.log('Table created successfully');
//     });
// };

// Function to insert data into the table
export const insertUser = (First_name, Last_name, Balance) => {
    const insertUserQuery = 'INSERT INTO users (First_name, Last_name, Balance) VALUES (?, ?, ?)';
    connection.query(insertUserQuery, [First_name, Last_name, Balance], (err, result) => {
        if (err) {
            console.error('Failed to insert user:', err);
            return;
        }
        console.log('User inserted successfully');
    });
};

// Function to select data from the table
export const getUsers = (callback) => {
    const getUsersQuery = 'SELECT * FROM users';
    connection.query(getUsersQuery, (err, results) => {
        if (err) {
            console.error('Failed to fetch users:', err);
            return;
        }
        callback(results);
    });
};
