import React, { useEffect } from "react";
import Loader from "../Loader/Loader";
import { Grid, makeStyles } from "@material-ui/core";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/userSlice";

const useStyles = makeStyles((theme) => ({
  userGridContainer: {
    width: "100%",
    margin: "0 auto",
  },
}));

const UserList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <Grid container spacing={3} className={classes.userGridContainer}>
      {users.map((user) => {
        const avatarUrl = `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}`;
        return <User user={user} diceBearUrl={avatarUrl} key={user.id} />;
      })}
    </Grid>
  );
};

export default UserList;
