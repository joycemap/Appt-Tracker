var React = require("react");
const Layout = require("./Layout.jsx");

class Oneappt extends React.Component {
  render() {
    console.log("creating a user page div?");

    return (
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 cards">
        <div
          class="output card bg-light mb-3  border-dark mb-3 shadow-sm p-3 mb-5 bg-white rounded"
          style={{ width: 18 + "rem" }}
        >
          <div class="card-body">
            <p class="card-text">
              <strong>Name:</strong> {this.props.apptData.appt_date}
              <br />
              <strong>Dose:</strong> {this.props.apptData.dose}{" "}
              {this.props.apptData.dose_category}
              <br />
              <strong>Next dose in:</strong> {this.props.apptData.nextTime} (
              {this.props.timing})<br />
            </p>
            <p>
              <a
                class="btn btn-primary"
                href={`/meds/single/edit/${this.props.apptData.id}`}
              >
                Edit this entry
              </a>
            </p>
            <p>
              <a
                class="btn btn-warning"
                href={`/appt/single/delete/${this.props.apptData.id}`}
              >
                Delete this entry
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
    let url = "/appt/updates/" + this.props.cookieUserId + "?_method=PUT";
    console.log("keys length: " + Object.keys(this.props.apptData[0]).length);
    console.log("cookie user id: " + this.props.cookieUserId);

    if (Object.keys(this.props.apptData[0]).length === 1) {
      return (
        <Layout
          cookieLogin={this.props.cookieLogin}
          cookieUserId={this.props.cookieUserId}
          anylogdata={this.props.anylogdata}
        >
          <h1>{this.props.apptData[0].name}'s Appointments</h1>
          <form method="POST" action={url}>
            <input
              class="btn btn-outline-success"
              id="confirmBtn"
              type="submit"
              value="Action"
            />
          </form>
          <a href="/meds/new">
            <button class="btn btn-info">Add appointment</button>
          </a>
        </Layout>
      );
    }

    console.log("inside List creation?");

    let itemElements = this.props.apptData.map(appt => {
      return (
    //     <Onemed mData={med} timing={med.start_time.toString()}>
    //       {" "}
    //     </Onemed>
    //   );
    // });

    // return (
      <Layout
        cookieLogin={this.props.cookieLogin}
        cookieUserId={this.props.cookieUserId}
        anylogdata={this.props.anylogdata}
      >
        <h1>{this.props.apptData[0].name}'s Appointments</h1>
       
        <div class="item-container">{itemElements}</div>
        <a href="/appt/new">
          <button class="btn btn-info">Add appointment</button>
        </a>

      </Layout>
    );
  }
}

module.exports = Userpage;
