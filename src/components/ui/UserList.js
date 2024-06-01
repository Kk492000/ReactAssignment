import React from "react";
import useApi from "../../customhooks/useApi";
import { apiConfig } from "../../ApiConfig/apiConfig";
import Loader from "../Loader/Loader";
import { Grid, makeStyles } from "@material-ui/core";
import User from "./User";

const useStyles = makeStyles((theme) => ({
  userGridContainer: {
    width: "100%",
    margin: "0 auto",
  },
}));

const UserList = () => {
  const classes = useStyles();
  const { data, loader } = useApi(apiConfig.getUsers);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <Grid container spacing={3} className={classes.userGridContainer}>
          {data.map((user) => {
            const avatarUrl = `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}`;
            return <User user={user} diceBearUrl={avatarUrl} key={user.id} />;
          })}
        </Grid>
      )}
    </>
  );
};

export default UserList;
