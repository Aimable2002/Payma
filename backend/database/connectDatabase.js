import mysql from 'mysql';

const connectDatabase = () => {
    try {
        const connection = mysql.createConnection({
            host:  "localhost",
            user: "root",
            password: "",
            database: "payma",

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





// const connection = mysql.createConnection({
//     host:  "162.55.131.89",
//     user: "konnectr_konnectr",
//     password: "Back_wizard12@.",
//     database: "konnectr_konnect",
    
// });

// import mysql from 'mysql';

// let connection;

// const connectDatabase = () => {
//     try {
//         connection = mysql.createConnection({
//             host: "162.55.131.89",
//             user: "konnectr_konnectr",
//             password: "Back_wizard12@.",
//             database: "konnectr_konnect",
//         });

//         connection.connect((err) => {
//             if (err) {
//                 console.error('Failed to connect to the database:', err.message);
//                 setTimeout(connectDatabase, 2000); 
//                 return;
//             }

//             console.log('Connected to the database');
//         });

//         connection.on('error', (err) => {
//             console.error('MySQL error:', err);
//             if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//                 console.error('MySQL connection was closed. Attempting to reconnect...', err.message);
//                 connectDatabase(); 
//             } else {
//                 console.error('MySQL error occurred:', err.message);
//             }
//         });

//         return connection;
//     } catch (error) {
//         console.error('Failed to connect to the database:', error.message);
//     }
// };

// export default connectDatabase;

