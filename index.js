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
        response.render('AHome');
    }
});

/**
 * ===================================
 * CREATE A NEW APPOINTMENT
 * ===================================
 */
app.get('/appt/new', (request, response) => {
    // respond with HTML page with form to create new appt
    if (sha256("you are in" + request.cookies["User"] + SALT) === request.cookies["loggedin"]) {
        let cookieLogin = (sha256("you are in" + request.cookies["User"] + SALT) === request.cookies["loggedin"]) ? true : false;
        let cookieUserId = request.cookies['User'];
        let anylogdata = false;
        const data = {
            cookieLogin: cookieLogin,
            cookieUserId: cookieUserId,
            anylogdata: anylogdata
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
        newAppt.Date,
        newAppt.Time,
        newAppt.Location,
        newAppt.Doctor,
        newAppt.Notes,
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
        // console.log(response.body);

        const queryString = "SELECT appointment.id AS appt_date,appointment.Time,appointment.Location,appointment.Doctor,appointment.Notes,appointment.user_id,users.name FROM appointment INNER JOIN users ON (users.id = appointment.user_id) WHERE appointment.user_id = $1 ORDER BY appointment.Date ASC";

        const values = [parseInt(request.params.id)];

        pool.query(queryString, values, (err, res) => {
            if (err) {
                console.log("query error", err.message);
            } else {
                // console.log(res.rows);
                if (res.rows[0] === undefined) {
                    console.log("user undefined: " + cookieUserId);
                    const queryString = "SELECT name FROM users WHERE id = $1";
                    const values = [parseInt(request.params.id)];
                    let anylogdata = false;
                    pool.query(queryString, values, (err, res) => {
                        if (err) {
                            console.log("query error", err.message);
                        } else {
                            console.log(res.rows);
                            const data = {
                                apptData: res.rows,
                                cookieLogin: cookieLogin,
                                cookieUserId: cookieUserId,
                                anylogdata: anylogdata
                            }
                            response.render('Userpage', data);
                        }
                    })
                }
                // else {
                // //find out how long to next pill (eg: in 2 hours)
                // for (let i = 0; i < res.rows.length; i++) {
                //     let timeNextPill = res.rows[i].start_time;
                //     res.rows[i]['nextTime'] = moment(timeNextPill).toNow(true);
                // }

                // //find shortest time to next pill
                // let min = res.rows[0].start_time, max = res.rows[0].start_time;
                // for (let i = 0, len = res.rows.length; i < len; i++) {
                //     let v = res.rows[i].start_time;
                //     min = (v < min) ? v : min;
                //     max = (v > max) ? v : max;
                // }


                // let anylogdata = true;
                // const data = {
                //     apptData: res.rows,
                //     cookieUserId: cookieUserId,
                //     cookieLogin: cookieLogin,
                //     anylogdata: anylogdata
                // }
                // response.render('Userpage', data);
            }
        })
    }
    else {
        response.clearCookie('User');
        response.clearCookie('loggedin');
        response.redirect('/');
    }
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

app.get('/register', (request, response) => {
    response.render('ARegister');
});




/**
 * ===================================
 * LOGIN
 * ===================================
 */

// app.get('/login', (request, response) => {
//     response.render('ALogin');
// });


// app.post('/login', (request, response) => {

//     let query = "SELECT * FROM users WHERE name='" + request.body.name + "'";

//     console.log("LOGIN: " + query)

//     pool.query(query, (err, result) => {

//         if (err) {
//             console.log("Login error", err);
//             response.status(500).send("error")

//         } else {

//             if (result.rows.length === 0) {
//                 response.send("NO RESULT");
//             } else {


//                 // hash the request, if its the same as db
//                 let hashedRequestPw = sha256(request.body.password + SALT);

//                 // if the password in the db matches the one in the login form
//                 if (result.rows[0].password === hashedRequestPw) {

//                     let user_id = result.rows[0].id;
//                     let hashedCookie = sha256(SALT + user_id);


//                     // response.cookie('loggedIn', true);
//                     response.cookie('loggedIn', hashedCookie);
//                     response.cookie('userId', user_id);
//                     // response.send( result.rows[0] );
//                     response.render('Home')
//                 } else {
//                     response.send("Not verified. Please re-enter your Username and password.")
//                 }

//             }

//         }

//     });

// });

/**
 * ===================================
 * FAVORITES NOTE - WIP Can't see Userid now
 * ===================================
 */

app.get("/favorites/new", (request, response) => {
    if (request.cookies.loggedIn !== undefined) {
        let query = "SELECT * from songs";
        pool.query(query, (err, result) => {
            const data = {
                songs: result.rows
            };
            response.render("Faveform", data);
        });
    } else {
        response.send("Please log in first!")
    }
});

app.get("/favorites", (request, response) => {
    if (request.cookies.loggedIn === undefined) {
        response.send("Please log in to view your favorites")
    }
    const userID = request.cookies.userID;
    const values = [userID];
    const query = `
      SELECT songs.id, songs.title, songs.preview_link
      FROM SONGS
      INNER JOIN favorites
      on (songs.id = favorites.song_id)
      WHERE favorites.user_id = $1;`;
    pool.query(query, values, (err, result) => {
        const favorites = result.rows;
        const data = {
            favorites: favorites,
            username: request.cookies.username
        };
        response.render("Faves", data);
    });
})

app.post("/favorites", (request, response) => {
    const songId = request.body.song_id;
    const userId = request.cookies.userID;
    const values = [songId, userId];
    const query = "INSERT into favorites (song_id, user_id) VALUES ($1, $2)";
    pool.query(query, values, (err, result) => {
        if (err) console.log(err);
        else {
            response.redirect("/");
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