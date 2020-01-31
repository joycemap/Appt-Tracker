var React = require("react");
const Layout = require("./layout.jsx");

class Delete extends React.Component {
  render() {
    console.log("in delete form");

    let url = `/appt/delete/${this.props.appointment.id}?_method=DELETE`;

    return (
      <Layout
        cookieLogin={this.props.cookieLogin}
        cookieUserId={this.props.cookieUserId}
        anylogdata={this.props.anylogdata}
      >
        <h1>Confirm delete appointment</h1>
        <form method="POST" action={url}>
          <input type="hidden" name="id" value={this.props.appointment.id} />
          <input
            type="hidden"
            name="user_id"
            value={this.props.appointment.user_id}
          />
          <p>
            <strong>Date:</strong> {this.props.appointment.Date} <br />
          </p>
          <p>
            <strong>Time:</strong> {this.props.appointment.Time} <br />
          </p>
          <p>
            <strong>Location:</strong> {this.props.appointment.Location} <br />
          </p>
          <p>
            <strong>Notes:</strong> {this.props.appointment.Notes} <br />
          </p>
          <input class="btn btn-danger" type="submit" value="Submit" />{" "}
          <a href={`/appointment/${this.props.appointment.user_id}`}>
            <input class="btn btn-secondary" type="button" value="Cancel" />
          </a>
        </form>
      </Layout>
    );
  }
}

module.exports = Delete;
