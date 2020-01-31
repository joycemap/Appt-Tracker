var React = require("react");
const Layout = require("./Layout.jsx");
class New extends React.Component {
  render() {
    return (
      <Layout
        cookieLogin={this.props.cookieLogin}
        cookieUserId={this.props.cookieUserId}
        anylogdata={this.props.anylogdata}
      >
        <h1>Create a new appointment!</h1>
        <div style={{ marginBottom: `10px` }}></div>

        <form action="/appt" method="POST">
          <div style={{ paddingBottom: `10px` }}>
            <input type="date" placeholder="Date" name="Date" />
          </div>

          <div style={{ paddingBottom: `10px` }}>
            <input type="time" placeholder="Time" name="Time" />
          </div>
          <div style={{ paddingBottom: `10px` }}>
            <input type="text" placeholder="Location" name="Location" />
          </div>
          <div style={{ paddingBottom: `10px` }}>
            <input type="text" placeholder="Doctor" name="Doctor" />
          </div>
          <div style={{ paddingBottom: `10px` }}>
            <input type="text" placeholder="Notes" name="Notes" />
          </div>
          <div>
            <input
              type="submit"
              value="Create!"
              style={{ borderRadius: `5px`, marginRight: `10px` }}
            />
          </div>
        </form>
      </Layout>
    );
  }
}

module.exports = New;
