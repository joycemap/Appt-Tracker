console.log("starting up!!");
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');
const SALT = "banana";
const sha256 = require('js-sha256');

// Initialise postgres client
const configs = {
    user: 'joyce',
    host: '127.0.0.1',
    database: 'apptdb',
    port: 5432,
};
const pool = new pg.Pool(configs);
pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
// Init express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */
/**
 * ===================================
 * HOME / LOGIN
 * ===================================
 */
app.get('/', (request, response) => {
    if (sha256("you are in" + request.cookies["User"] + SALT) === request.cookies["loggedin"]) {
        let cookieLogin = (sha256("you are in" + request.cookies["User"] + SALT) === request.cookies["loggedin"]) ? true : false;
        let userId = request.cookies['User'];
        response.redirect(`/appt/${userId}`);
    } else {
        response.render('Home');
    }
});

/**
 * ===================================
 * CREATE A NEW APPOINTMENT FOR LOGGED IN USER
 * ===================================
 */
app.get('/appt/new', (request, response) => {
    // respond with HTML page with form to create new appt
    if (sha256("you are in" + request.cookies["User"] + SALT) === request.cookies["loggedin"]) {
        let cookieLogin = (sha256("you are in" + request.cookies["User"] + SALT) === request.cookies["loggedin"]) ? true : false;
        let cookieUserId = request.cookies['User'];

        const data = {
            cookieLogin: cookieLogin,
            cookieUserId: cookieUserId,
        }
        response.render('New', data);
    } else {
        response.clearCookie('User');
        response.clearCookie('loggedin');
        response.redirect('/');
    }
});

app.post('/appt', (request, response) => {
    var newAppt = request.body;
    let userId = request.cookies['User'];
    let insertQueryText = 'INSERT INTO appointment (Date, Time, Location, Doctor, Notes, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [
        newAppt.date,
        newAppt.time,
        newAppt.location,
        newAppt.doctor,
        newAppt.notes,
        userId
    ];
    pool.query(insertQueryText, values, (err, result) => {
        console.log("INSERT query callback")
        console.log()
        if (err) {
            console.log("ERROR", err);
            response.send("error")
        } else {
            console.log("DONE", result.rows)
            response.redirect('/appt/${userId}')
        }
    });
})



/**
 * ===================================
 * VIEW ALL APPOINTMENTS FOR LOGGED IN USER
 * ===================================
 */
app.get('/appt/:id', (request, response) => {
    if (sha256("you are in" + request.cookies["User"] + SALT) === request.cookies["loggedin"]) {

        var cookieLogin = (sha256("you are in" + request.cookies["User"] + SALT) === request.cookies["loggedin"]) ? true : false;
        var cookieUserId = request.cookies['User'];
        console.log("get cookies user id: " + cookieUserId);

        const values = [parseInt(request.params.id)];
        const queryString = "SELECT * FROM appointment WHERE user_id = $1 ORDER BY appointment.date ASC";

        pool.query(queryString, values, (err, res) => {
            if (err) {
                console.log("query error", err.message);
            } else {
                // console.log(res.rows);
                if (res.rows[0] === undefined) {
                    console.log("user has no appointments: " + cookieUserId);
                    response.redirect('/appt/new');
                } else {
                    console.log(res.rows);
                    const data = {
                        apptData: res.rows,
                        cookieLogin: cookieLogin,
                        cookieUserId: cookieUserId,
                        // anylogdata: anylogdata
                    }
                    response.render('Userpage', data);
                }
            }

        })
    } else {
        response.clearCookie('User');
        response.clearCookie('loggedin');
        response.redirect('/');
    }
});


/**
 * ===================================
 * EDIT SPECIFIED APPOINTMENT FOR LOGGED IN USER
 * ===================================
 */
app.get('/appt/:id/edit', (request, response) => {
    if (sha256("you are in" + request.cookies["User"] + SALT) === request.cookies["loggedin"]) {
        let cookieLogin = (sha256("you are in" + request.cookies["User"] + SALT) === request.cookies["loggedin"]) ? true : false;
        let cookieUserId = request.cookies['User'];
        var inputId = parseInt(request.params.id);
        let queryString = "SELECT * FROM appointment WHERE id = ($1)";
        var idVal = [inputId];
        pool.query(queryString, idVal, (err, res) => {
            if (err) {
                console.log("query error", err.message);
            } else {
                if (res.rows[0] === undefined) {
                    response.send("Please add an appointment first.");
                }
                else {

                    const data = {
                        apptData: res.rows[0],
                        cookieLogin: cookieLogin,
                        cookieUserId: cookieUserId,
                    };
                    // console.log(data);
                    response.render('Edit', data);
                }
            }
        });
    } else {
        response.clearCookie('User');
        response.clearCookie('loggedin');
        response.redirect('/');
    }
});

//Update database with edits for a specified appointment

app.put('/appt/:id', (request, response) => {
    console.log("inside individual edit put");
    var inputId = parseInt(request.params.id);
    var idVal = [inputId];
    var newAppt = request.body;

    let queryString = "UPDATE appointment SET Date=($1), Time=($2), Location=($3), Doctor=($4), Notes=($5) WHERE id = ($6)";

    let values = [appointment.Date, appointment.Time, appointment.Location, appointment.Doctor, appointment.Notes, appointment.id];

    pool.query(queryString, values, (err, response) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            response.redirect(`/appt/${appointment.user_id}`);
        }
    });
});

/**
 * ===================================
 * DELETE A SPECIFIED APPOINTMENT FOR LOGGED IN USER
 * ===================================
 */

app.get('/appt/delete/:id', (request, response) => {

    if (sha256("you are in" + request.cookies["User"] + SALT) === request.cookies["loggedin"]) {
        let cookieLogin = (sha256("you are in" + request.cookies["User"] + SALT) === request.cookies["loggedin"]) ? true : false;
        let cookieUserId = request.cookies['User'];
        var inputId = parseInt(request.params.id);
        let queryString = "SELECT * FROM appointment WHERE id = ($1)";
        var idVal = [inputId];
        pool.query(queryString, idVal, (err, res) => {
            if (err) {
                console.log("query error", err.message);
            } else {
                const data = {
                    appointment: res.rows[0],
                    cookieLogin: cookieLogin,
                    cookieUserId: cookieUserId
                };
                response.render('Delete', data);
            }
        });
    } else {
        response.clearCookie('User');
        response.clearCookie('loggedin');
        response.redirect('/');
    }

});

app.delete('/appt/:id', (request, response) => {
    console.log("inside app delete");
    var newAppt = request.body;
    var inputId = parseInt(request.params.id);
    //delete appointment
    let queryString = "DELETE FROM appointment WHERE id = ($1)";

    var idVal = [inputId];
    console.log(idVal);
    pool.query(queryString, idVal, (err, response) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            //response.send('Yay! deleted!');
            response.redirect(`/appt/${newAppt.user_id}`);
        }
    })
});


/**
 * ===================================
 * REGISTER 
 * ===================================
 */

app.post('/users', (request, response) => {

    // if they are, insert the record

    let queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';

    let hashedPw = sha256(request.body.password + SALT);

    const values = [
        request.body.name,
        hashedPw
    ];

    pool.query(queryString, values, (err, res) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            console.log("YAY REGISTER");
            // console.log(res.rows[0] );

            let hashedLogin = sha256("you are in" + res.rows[0].id + SALT);


            // check to see if err is null

            // they have successfully registered, log them in
            response.cookie('loggedin', hashedLogin);
            response.cookie('User', res.rows[0].id);
            response.redirect('/appt/' + res.rows[0].id);
        }
    });
});

app.get('/logout', (request, response) => {
    response.clearCookie('loggedin');
    response.clearCookie('User');
    response.redirect('/');
});

app.get('/register', (request, response) => {
    response.render('Register');
});

/**
 * ===================================
 * LOGIN CHECK
 * ===================================
 */
app.post('/users/logincheck', (request, response) => {
    // hash the password
    let hashedPassword = sha256(request.body.password + SALT);
    // console.log(request.body);

    const queryString = "SELECT * FROM users WHERE name=$1 AND password=$2";

    const values = [request.body.name, hashedPassword];

    pool.query(queryString, values, (err, res) => {
        if (err) {
            console.log("query error", err.message);

        } else {
            if (res.rows[0] === undefined) {
                response.send("Incorrect username or password. Please try again.");
            } else {
                console.log("YAY LOGIN CHECK");
                // console.log(res.rows);

                let hashedLogin = sha256("you are in" + res.rows[0].id + SALT);
                // check to see if err is null

                // they have successfully registered, log them in
                response.cookie('loggedin', hashedLogin);
                response.cookie('User', res.rows[0].id);
                response.redirect('/appt/' + res.rows[0].id);
            }

        }
    });
});





/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
let onClose = function () {
    console.log("closing");
    server.close(() => {
        console.log('Process terminated');
        pool.end(() => console.log('Shut down db connection pool'));
    })
};
process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);