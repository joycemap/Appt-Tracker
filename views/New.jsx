var React = require("react");
const Layout = require("./Layout.jsx");
class New extends React.Component {
  render() {
    return (
      <Layout
        cookieLogin={this.props.cookieLogin}
        cookieUserId={this.props.cookieUserId}
        apptData={this.props.apptData}
      >
        <h1>Create a new appointment</h1>
        <div style={{ marginBottom: `10px` }}></div>

        <form action="/appt" method="POST">
          <div style={{ paddingBottom: `10px` }}>
            <input type="date" placeholder="date" id="datefield" name="date" />
          </div>

          <div style={{ paddingBottom: `10px` }}>
            <input type="time" placeholder="time" name="time" />
          </div>
          <div style={{ paddingBottom: `10px` }}>
            <input type="text" placeholder="location" name="location" />
          </div>
          <div style={{ paddingBottom: `10px` }}>
            <input type="text" placeholder="doctor" name="doctor" />
          </div>
          <div style={{ paddingBottom: `10px` }}>
            <input type="text" placeholder="notes" name="notes" />
          </div>
          <div>
            <input
              class="btn btn-danger btn-lg"
              type="submit"
              value="Create Appointment"
            />
          </div>
        </form>
        <script src="/script.js"></script>
      </Layout>
    );
  }
}

module.exports = New;
