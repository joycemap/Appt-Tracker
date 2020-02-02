var React = require("react");
const Layout = require("./Layout.jsx");

class Edit extends React.Component {
  render() {
    console.log("in edit form");

    let url = `/appt/edit/${this.props.apptData.id}?_method=PUT`;
    console.log(this.props);

    return (
      <Layout
        cookieLogin={this.props.cookieLogin}
        cookieUserId={this.props.cookieUserId}
      >
        <h1>Edit this appointment</h1>
        <div class="container formwrap align-items-center justify-content-center col-6">
          <div class="row">
            <div class="col">
              <form method="POST" action={url}>
                <div class="form-group">
                  <p>
                    <strong>Appointment ID</strong>
                  </p>
                  <input
                    type="hidden"
                    name="id"
                    value={this.props.apptData.id}
                  />
                  <p>
                    <strong>User ID</strong>
                  </p>
                  <input
                    type="hidden"
                    name="user_id"
                    value={this.props.apptData.user_id}
                  />
                  <p>
                    {/* <strong>Date:</strong> {this.props.apptData.date} */}
                  </p>
                  {/* <input
                    class="form-control"
                    type="date"
                    name="date"
                    value={this.props.apptData.date}
                  /> */}
                </div>
                <div>
                  <p>
                    <strong>Time:</strong> {this.props.apptData.time}
                  </p>
                  <input
                    class="form-control"
                    type="time"
                    name="time"
                    value={this.props.apptData.time}
                  />
                </div>
                <div>
                  <p>
                    <strong>Location:</strong> {this.props.apptData.location}
                  </p>
                  <input
                    class="form-control"
                    type="text"
                    name="location"
                    value={this.props.apptData.location}
                  />
                </div>
                <div>
                  <p>
                    <strong>Doctor:</strong> {this.props.apptData.doctor}
                  </p>
                  <input
                    class="form-control"
                    type="text"
                    name="doctor"
                    value={this.props.apptData.doctor}
                  />
                </div>
                <div>
                  <p>
                    <strong>Notes:</strong> {this.props.apptData.notes}
                  </p>
                  <input
                    class="form-control"
                    type="text"
                    name="notes"
                    value={this.props.apptData.notes}
                  />
                </div>
                <div class="form-group">
                  <input
                    class="btn btn-primary"
                    type="submit"
                    value="Make Changes"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Edit;
