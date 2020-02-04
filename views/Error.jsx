var React = require("react");

class Error extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/custom.css" />
        </head>
        <body>
          <h1>Incorrect username or password. Please try again.</h1>
          <div>
            <form action="/users/logincheck" method="POST">
              <p>
                Name <input name="name" required />
              </p>
              <p>
                Password <input type="password" name="password" required />
              </p>
              <div class="form-actions"></div>
              <div>
                <input
                  className="btn btn-dark btn-lg btn-block"
                  type="submit"
                  value="Click Here to log in"
                />
                <a
                  class="btn btn-danger btn-lg btn-block"
                  href="/register"
                  role="button"
                >
                  New User? Click here to register
                </a>
              </div>
            </form>
          </div>
          <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
            integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
            integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
            crossOrigin="anonymous"
          ></script>
        </body>
      </html>
    );
  }
}

module.exports = Error;
