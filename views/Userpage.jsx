var React = require("react");
const Layout = require("./Layout.jsx");

class OneAppt extends React.Component {
  render() {
    console.log("creating a user page");

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
              <strong>Date:</strong> {this.props.apptData.date}
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
                href={`/appt/single/edit/${this.props.apptData.id}`}
              >
                Edit this appointment
              </a>
            </p>
            <p>
              <a
                class="btn btn-warning"
                href={`/appt/single/delete/${this.props.apptData.id}`}
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
          <h1> Your Appointments</h1>
          <form method="POST" action={url}>
            <input
              class="btn btn-dark btn-lg"
              type="submit"
              value="Add appointment"
            />
          </form>
        </Layout>
      );
    }

    console.log("inside appointment creation");
    console.log(apptData[0]);
    let itemElements = this.props.appointment.map(appt => {
      console.log(itemElements);
      return (
        <Layout
          cookieLogin={this.props.cookieLogin}
          cookieUserId={this.props.cookieUserId}
          apptData={this.props.apptData[0]}
        >
          <h1>{this.props.apptData[0].name}'s Appointments</h1>

          <div class="item-container">{itemElements}</div>
        </Layout>
      );
    });
  }
}

module.exports = Userpage;
