var React = require("react");
const Layout = require("./Layout.jsx");

class OneAppt extends React.Component {
  render() {
    console.log("creating a data div?");

    return (
      <div class="cards">
        <div
          class="output card bg-light mb-3  border-dark mb-3 shadow-sm mb-5 bg-white rounded"
          style={{ width: 80 + "rem" }}
        >
          <div class="card-body">
            <p class="card-text">
              <strong>Date:</strong>{" "}
              {this.props.apptData.date
                .toString()
                .split(" ")
                .slice(0, 4)
                .join(" ")}
              <br />
              <strong>Time:</strong> {this.props.apptData.time.slice(0, -3)}
              <br />
              <strong>Location:</strong> {this.props.apptData.location} <br />
              <strong>Doctor:</strong> {this.props.apptData.doctor} <br />
              <strong>Notes:</strong> {this.props.apptData.notes} <br />
            </p>
            <div>
              <a
                class="btn btn-primary"
                href={`/appt/${this.props.apptData.id}/edit`}
              >
                Edit
              </a>
              <div class="divider" />
              <a
                class="btn btn-danger"
                href={`/appt/delete/${this.props.apptData.id}`}
              >
                Delete
              </a>
            </div>
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
          <a class="btn btn-primary" href="/appt/new">
            Add appointment
          </a>
        </p>
        <div class="item-container">{itemElements}</div>
      </Layout>
    );
  }
}

module.exports = Userpage;
