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
              <strong>Date:</strong> {this.props.apptData.date}
              <br />
              <strong>Time:</strong> {this.props.apptData.time}
              <br />
              <strong>Location:</strong> {this.props.apptData.location}
              <br />
              <strong>Doctor:</strong> {this.props.apptData.doctor}
              <br />
              <strong>Notes:</strong> {this.props.apptData.notes}
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
    console.log(this.props.apptData);

    let itemElements = this.props.apptData.map(log => {
      return <Onelog logData={log}> </Onelog>;
    });

    let url = "/appt/" + this.props.apptData[0].user_id;

    return (
      <Layout
        cookieLogin={this.props.cookieLogin}
        cookieUserId={this.props.cookieUserId}
        apptData={this.props.apptData}
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
