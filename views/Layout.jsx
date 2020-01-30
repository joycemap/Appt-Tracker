var React = require("react");

class Layout extends React.Component {
  render() {
    console.log(this.props.cookieUserId);
    let cookieLogin = this.props.cookieLogin ? "Logout" : "Login";
    let url = this.props.cookieLogin ? "/logout" : "/";

    console.log("anylogdata: " + this.props.anylogdata);
    let classdis = this.props.anylogdata ? "nav-link" : "nav-link disabled";
    let ariadis = this.props.anylogdata ? false : true;
    let logurl = this.props.anylogdata
      ? `/appt/${this.props.cookieUserId}/log`
      : "#";

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
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">
              Appointment Tracker
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class={classdis} href={logurl} aria-disabled={ariadis}>
                    Appointment Log
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href={url} tabindex="-1">
                    {cookieLogin}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = Layout;
