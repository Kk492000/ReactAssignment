import React from "react";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  userGridContainer: {
    width: "100%",
    boxSizing: "border-box",
    justifyContent: "center",
  },
  gridBox: {
    border: "0.5px solid #ccc",
    width: "100%",
    borderRadius: "3px",
  },
  userInfo: {
    display: "flex",
    gap: "15px",
    marginBottom: "4px",
    "& .MuiTypography-body1": {
      fontSize: "12px",
      fontFamily: "Gudea",
    },
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    background: "#F8F8F8",
  },
  infoContainer: {
    padding: "20px 20px",
    "& .userName": {
      fontFamily: "Mulish",
      marginBottom: "5px",
      fontWeight: "bold",
      fontSize: "14px",
    },
  },
}));

const User = ({ user, diceBearUrl }) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        item
        key={user.id}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className={classes.userGridContainer}
      >
        <Box className={classes.gridBox}>
          <Box className={classes.imgContainer}>
            <img src={diceBearUrl} width="100px" />
          </Box>
          <Box className={classes.infoContainer}>
            <Typography className="userName">{user.name}</Typography>
            <Box className={classes.userInfo}>
              <MailOutlined />
              <Typography>{user.email}</Typography>
            </Box>
            <Box className={classes.userInfo}>
              <PhoneOutlined />
              <Typography>{user.phone}</Typography>
            </Box>
            <Box className={classes.userInfo}>
              <PhoneOutlined />
              <Typography>{user.website}</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default User;
