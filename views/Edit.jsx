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
            <div class="form-group offset-lg-2 col-lg-8">
              <input type="hidden" name="id" value={this.props.apptData.id} />
              <input
                type="hidden"
                name="user_id"
                value={this.props.apptData.user_id}
              />
              <p>
                <label for="date">
                  <strong>Date:</strong>
                </label>
                {" "}{this.props.apptData.date
                  .toString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ")}
              </p>
              <label for="date field"></label>
              <input
                class="form-control"
                type="date"
                name="date"
                id="datefield"
                value={this.props.apptData.date}
              />
              <p>
                <strong>Time:</strong>
              </p>
              <label for="time field"></label>
              <input
                class="form-control"
                type="time"
                name="time"
                value={this.props.apptData.time}
              />
              <p>
                <strong>Location:</strong>
              </p>
              <label for="location field"></label>
              <input
                class="form-control"
                type="text"
                name="location"
                value={this.props.apptData.location}
              />
              <p>
                <strong>Doctor:</strong>
              </p>
              <label for="doctor field"></label>
              <input
                class="form-control"
                type="text"
                name="doctor"
                value={this.props.apptData.doctor}
              />
              <p>
                <strong>Notes:</strong>
              </p>
              <label for="notes field"></label>
              <input
                class="form-control"
                type="text"
                name="notes"
                value={this.props.apptData.notes}
              />{" "}
              <br></br>
              <div class="form-group">
                <label for="edit button"></label>
                <input
                  class="btn btn-danger btn-lg"
                  type="submit"
                  value="Edit appointment"
                />
              </div>
            </div>
          </form>
        </div>
        <script src="/script.js"></script>
      </Layout>
    );
  }
}

module.exports = Edit;
