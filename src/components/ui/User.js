import React, { useState } from "react";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import {
  MailOutlined,
  PhoneOutlined,
  HeartOutlined,
  EditOutlined,
  DeleteFilled,
  HeartFilled,
} from "@ant-design/icons";
import EditUser from "../modal/EditUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, toggleFavourite } from "../../store/userSlice";
import { Colors } from "../../constants/colors";

const useStyles = makeStyles((theme) => ({
  userGridContainer: {
    width: "100%",
    boxSizing: "border-box",
    justifyContent: "center",
  },
  gridBox: {
    border: `0.5px solid ${Colors.border}`,
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
    background: `${Colors.backgroundDefault}`,
  },
  infoContainer: {
    padding: "20px",
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
    "& .deleteIcon, & .heartIcon": {
      "&:hover": {
        color: "#ff0000",
      },
    },
    "& .heartIcon": {
      color: "#ff0000",
    },
    "& .deleteIcon, & .editIcon": {
      color: "gray",
    },
    "& .editIcon": {
      "&:hover": {
        color: Colors.primary,
      },
    },
  },
}));

const User = ({ user, diceBearUrl }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const favourites = useSelector((state) => state.users.favourites);

  const handleModalToggle = () => setOpenModal((prev) => !prev);

  const handleUserAction = (action) => {
    if (action === "delete") {
      dispatch(deleteUser(user.id));
    } else if (action === "toggleFavourite") {
      dispatch(toggleFavourite(user.id));
    }
  };

  const isFavorite = favourites.includes(user.id);

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
            {[
              { icon: <MailOutlined />, text: user.email },
              { icon: <PhoneOutlined />, text: user.phone },
              { icon: <PhoneOutlined />, text: user.website },
            ].map((info, index) => (
              <Box key={index} className={classes.userInfo}>
                {info.icon}
                <Typography>{info.text}</Typography>
              </Box>
            ))}
          </Box>
          <Box
            style={{ background: Colors.backgroundDefault, padding: "12px 0" }}
          >
            <Grid container>
              {[
                {
                  icon: isFavorite ? <HeartFilled /> : <HeartOutlined />,
                  className: "heartIcon",
                  action: "toggleFavourite",
                },
                {
                  icon: <EditOutlined />,
                  className: "editIcon",
                  action: handleModalToggle,
                },
                {
                  icon: <DeleteFilled />,
                  className: "deleteIcon",
                  action: "delete",
                },
              ].map((iconInfo, index) => (
                <Grid item xs={4} key={index}>
                  <Box className={classes.iconsParent}>
                    <span
                      className={iconInfo.className}
                      onClick={
                        typeof iconInfo.action === "string"
                          ? () => handleUserAction(iconInfo.action)
                          : iconInfo.action
                      }
                    >
                      {iconInfo.icon}
                    </span>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Grid>

      <EditUser
        openModal={openModal}
        onCloseModal={handleModalToggle}
        user={user}
      />
    </>
  );
};

export default User;
