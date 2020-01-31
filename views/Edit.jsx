var React = require("react");
const Layout = require("./Layout.jsx");

class Edit extends React.Component {
  render() {
    console.log("in edit form");

    let url = `/appt/edit/${this.props.appointment.id}?_method=PUT`;

    return (
      <Layout
        cookieLogin={this.props.cookieLogin}
        cookieUserId={this.props.cookieUserId}
        anylogdata={this.props.anylogdata}
      >
        <h1>Edit this appointment</h1>
        <div class="container formwrap align-items-center justify-content-center col-6">
          <div class="row">
            <div class="col">
              <form method="POST" action={url}>
                <div class="form-group">
                  <input
                    type="hidden"
                    name="id"
                    value={this.props.appointment.id}
                  />
                  <input
                    type="hidden"
                    name="user_id"
                    value={this.props.appointment.user_id}
                  />
                  <p>
                    <strong>Date:</strong> {this.props.appointment.Date}
                  </p>
                  <input
                    class="form-control"
                    type="Date"
                    name="Date"
                    value={this.props.appointment.Date}
                  />
                </div>
                <div>
                  <p>
                    <strong>Time:</strong> {this.props.appointment.Time}
                  </p>
                  <input
                    class="form-control"
                    type="Time"
                    name="Time"
                    value={this.props.appointment.Time}
                  />
                </div>
                <div>
                  <p>
                    <strong>Location:</strong> {this.props.appointment.Location}
                  </p>
                  <input
                    class="form-control"
                    type="text"
                    name="Location"
                    value={this.props.appointment.Location}
                  />
                </div>
                <div>
                  <p>
                    <strong>Doctor:</strong> {this.props.appointment.Doctor}
                  </p>
                  <input
                    class="form-control"
                    type="text"
                    name="Doctor"
                    value={this.props.appointment.Doctor}
                  />
                </div>
                <div>
                  <p>
                    <strong>Notes:</strong> {this.props.appointment.Notes}
                  </p>
                  <input
                    class="form-control"
                    type="text"
                    name="Notes"
                    value={this.props.appointment.Notes}
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
