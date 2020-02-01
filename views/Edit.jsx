var React = require("react");

class Edit extends React.Component {
  render() {
    console.log("in edit form");

    let url = `/appt/${this.props.appointment.id}/edit?_method=PUT`;

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
                    <strong>Date:</strong> {this.props.appointment.date}
                  </p>
                  <input
                    class="form-control"
                    type="date"
                    name="date"
                    value={this.props.appointment.date}
                  />
                </div>
                <div>
                  <p>
                    <strong>Time:</strong> {this.props.appointment.time}
                  </p>
                  <input
                    class="form-control"
                    type="time"
                    name="time"
                    value={this.props.appointment.time}
                  />
                </div>
                <div>
                  <p>
                    <strong>Location:</strong> {this.props.appointment.location}
                  </p>
                  <input
                    class="form-control"
                    type="text"
                    name="location"
                    value={this.props.appointment.location}
                  />
                </div>
                <div>
                  <p>
                    <strong>Doctor:</strong> {this.props.appointment.doctor}
                  </p>
                  <input
                    class="form-control"
                    type="text"
                    name="doctor"
                    value={this.props.appointment.doctor}
                  />
                </div>
                <div>
                  <p>
                    <strong>Notes:</strong> {this.props.appointment.notes}
                  </p>
                  <input
                    class="form-control"
                    type="text"
                    name="notes"
                    value={this.props.appointment.notes}
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
