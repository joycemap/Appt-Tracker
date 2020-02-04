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
        <div class="cards">
          <form method="POST" action={url}>
            <div class="form-group">
              <input type="hidden" name="id" value={this.props.apptData.id} />
              <input
                type="hidden"
                name="user_id"
                value={this.props.apptData.user_id}
              />
              <p>
                <strong>Date:</strong>{" "}
                {this.props.apptData.date
                  .toString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ")}
              </p>
              <input
                class="form-control"
                type="date"
                name="date"
                min="new Date()"
                value={this.props.apptData.date}
              />
              <p>
                <strong>Time:</strong>
              </p>
              <input
                class="form-control"
                type="time"
                name="time"
                value={this.props.apptData.time}
              />
              <p>
                <strong>Location:</strong>
              </p>
              <input
                class="form-control"
                type="text"
                name="location"
                value={this.props.apptData.location}
              />
              <p>
                <strong>Doctor:</strong>
              </p>
              <input
                class="form-control"
                type="text"
                name="doctor"
                value={this.props.apptData.doctor}
              />
              <p>
                <strong>Notes:</strong>
              </p>
              <input
                class="form-control"
                type="text"
                name="notes"
                value={this.props.apptData.notes}
              />{" "}
              <br></br>
              <div class="form-group">
                <input
                  class="btn btn-dark btn-lg"
                  type="submit"
                  value="Edit appointment"
                />
              </div>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

module.exports = Edit;
