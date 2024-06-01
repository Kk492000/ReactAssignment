import React, { useState } from "react";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import {
  MailOutlined,
  PhoneOutlined,
  HeartOutlined,
  EditOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import EditUser from "../modal/EditUser";

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
  iconsParent: {
    display: "flex",
    justifyContent: "center",
    borderRight: "1px solid #ccc",
    "& span": {
      cursor: "pointer",
    },
  },
}));

const User = ({ user, diceBearUrl }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  function closeModalHandler() {
    setOpenModal(false);
  }
  function openModalHandler() {
    setOpenModal(true);
  }

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
            <img src={diceBearUrl} width="100px" alt={user.name} />
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
          <Box style={{ background: "#F8F8F8", padding: "12px 0" }}>
            <Grid container>
              <Grid item xs={4}>
                <Box className={classes.iconsParent}>
                  <HeartOutlined style={{ color: "#ff0000" }} />
                  {/* <HeartFilled /> */}
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className={classes.iconsParent}>
                  <EditOutlined onClick={openModalHandler} />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className={classes.iconsParent}>
                  <DeleteFilled />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>

      <EditUser openModal={openModal} onCloseModal={closeModalHandler} />
    </>
  );
};

export default User;
