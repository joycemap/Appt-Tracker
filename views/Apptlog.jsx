var React = require("react");
const Layout = require("./Layout.jsx");

class OneAppt extends React.Component {
  render() {
    console.log("An appointment");

    return (
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 cards">
        <div
          class="output card bg-light mb-3  border-dark mb-3 shadow-sm p-3 mb-5 bg-white rounded"
          style={{ width: "18rem" }}
        >
          <div class="card-body">
            <p class="card-text">
              <strong>Date:</strong> {this.props.logData.Date}
              <br />
              <strong>Time:</strong> {this.props.logData.Time}
              <br />
              <strong>Location:</strong> {this.props.logData.Location}
              <br />
              <strong>Doctor:</strong> {this.props.logData.Doctor}
              <br />
              <strong>Notes:</strong> {this.props.logData.Notes}
              <br />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

class Apptlog extends React.Component {
  render() {
    console.log(this.props.logData);

    let itemElements = this.props.logData.map(log => {
      return <Onelog logData={log}> </Onelog>;
    });

    let url = "/appt/" + this.props.logData[0].user_id;

    return (
      <Layout
        cookieLogin={this.props.cookieLogin}
        cookieUserId={this.props.cookieUserId}
        anylogdata={this.props.anylogdata}
      >
        <h1>Appointment Log</h1>

        <div class="item-container">{itemElements}</div>
        <a class="btn btn-primary" href={url}>
          Go back
        </a>
      </Layout>
    );
  }
}

module.exports = Apptlog;
