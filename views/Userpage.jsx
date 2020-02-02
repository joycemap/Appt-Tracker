var React = require("react");
const Layout = require("./Layout.jsx");

class OneAppt extends React.Component {
  render() {
    console.log("creating a data div?");

    return (
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 cards">
        <div
          class="output card bg-light mb-3  border-dark mb-3 shadow-sm p-3 mb-5 bg-white rounded"
          style={{ width: 18 + "rem" }}
        >
          <div class="card-body">
            <p class="card-text">
              <strong>Appointment id:</strong> {this.props.apptData.id}
              <br />
              {/* <strong>Date:</strong> {this.props.apptData.date} */}
              <br />
              <strong>Time:</strong> {this.props.apptData.time}
              <br />
              <strong>Location:</strong> {this.props.apptData.location} <br />
              <strong>Doctor:</strong> {this.props.apptData.doctor} <br />
              <strong>Notes:</strong> {this.props.apptData.notes} <br />
            </p>
            <p>
              <a
                class="btn btn-primary"
                href={`/appt/${this.props.apptData.id}/edit`}
              >
                Edit this appointment
              </a>
            </p>
            <p>
              <a
                class="btn btn-warning"
                href={`/appt/delete/${this.props.apptData.id}`}
              >
                Delete this appointment
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

class Userpage extends React.Component {
  render() {
    let url = "/appt/new/" + this.props.cookieUserId + "?_method=POST";
    console.log("keys length: " + Object.keys(this.props.apptData[0]).length);
    console.log("cookie user id: " + this.props.cookieUserId);

    if (Object.keys(this.props.apptData[0]).length === 1) {
      return (
        <Layout
          cookieLogin={this.props.cookieLogin}
          cookieUserId={this.props.cookieUserId}
          apptData={this.props.apptData[0]}
        >
          <div>
            <h1> Your Appointments</h1>
          </div>
        </Layout>
      );
    }

    console.log("inside List creation?");
    let itemElements = this.props.apptData.map(appt => {
      return <OneAppt apptData={appt}> </OneAppt>;
    });
    return (
      <Layout
        cookieLogin={this.props.cookieLogin}
        cookieUserId={this.props.cookieUserId}
      >
        <br />
        <p>
              <a
                class="btn btn-primary"
                href="/appt/new"
              >
              Add appointment
              </a>
            </p>
        <div class="item-container">{itemElements}</div>
      </Layout>
    );
  }
}

module.exports = Userpage;
