import React, { Component } from "react";
import Loader from "../Loader/Loader";
import { Grid, withStyles } from "@material-ui/core";
import User from "./User";
import { connect } from "react-redux";
import { fetchUsers } from "../../store/userSlice";

const styles = (theme) => ({
  userGridContainer: {
    width: "100%",
    margin: "0 auto",
  },
});

class UserList extends Component {
  componentDidMount() {
    if (this.props.status === "idle") {
      this.props.fetchUsers();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.status !== this.props.status &&
      this.props.status === "idle"
    ) {
      this.props.fetchUsers();
    }
  }

  render() {
    const { classes, users, status, error } = this.props;

    if (status === "loading") {
      return <Loader />;
    }
    if (status === "failed") {
      let errorMsg;
      if (error) {
        errorMsg = error;
      }
      return errorMsg;
    }

    return (
      <Grid container spacing={3} className={classes.userGridContainer}>
        {users.map((user) => {
          const avatarUrl = `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}`;
          return <User key={user.id} user={user} diceBearUrl={avatarUrl} />;
        })}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  status: state.users.status,
  error: state.users.error,
});

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserList));
