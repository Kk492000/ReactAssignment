import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  makeStyles,
  Zoom,
} from "@material-ui/core";
import ReactDOM from "react-dom";

import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Formik, Form } from "formik";
import ContainedButton from "../ui/ContainedButton";
import * as Yup from "yup";
import { Colors } from "../../constants/colors";

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    "& .MuiBackdrop-root": {
      background: "transparent",
    },
    "& .MuiDialog-paperWidthSm": {
      width: "100%",
      maxWidth: "420px",
    },
    "& .MuiPaper-elevation24": {
      boxShadow:
        "0px 4px 20px rgba(0, 0, 0, 0.1), 0px 7px 10px rgba(0, 0, 0, 0.1)",
    },
    "& .MuiDialogActions-root": {
      padding: "10px 20px 10px 0",
      borderTop: `1px solid ${Colors.grayLight}`,
    },
  },
  dialogHeadContainer: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: `1px solid ${Colors.grayLight}`,
    paddingBottom: "10px",
    "& p": {
      fontSize: "16px",
      fontFamily: "Mulish",
      fontWeight: 800,
    },
  },
  labelInputContainer: {
    display: "flex",
    marginBottom: "20px",
    gap: "6px",
    alignItems: "center",
    "& .MuiOutlinedInput-root": {
      height: "30px",
    },
    "& .MuiOutlinedInput-input": {
      padding: "7.5px 14px",
      fontSize: "14px",
    },
    "& p": {
      width: "45%",
      fontFamily: "Gudea",
      textAlign: "right",
      fontSize: "14px",
      "& span": {
        color: Colors.error,
      },
    },
    "& .MuiFormHelperText-root": {
      width: "100% !important",
      textAlign: "start !important",
    },
  },
  cancelBtn: {
    height: "30px",
    textTransform: "capitalize",
    color: Colors.black,
  },
}));

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  website: Yup.string().required("Website is required"),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  website: "",
};

const EditUser = ({ openModal, onCloseModal }) => {
  const classes = useStyles();

  if (!openModal) return null;

  return ReactDOM.createPortal(
    <Dialog
      TransitionComponent={Zoom}
      keepMounted
      onClose={onCloseModal}
      className={classes.dialogContainer}
      maxWidth="sm"
      open={openModal}
    >
      <DialogTitle id="alert-dialog-slide-title">
        <Box className={classes.dialogHeadContainer}>
          <Typography>Basic Modal</Typography>
          <CloseOutlined style={{ fontSize: "15px" }} onClick={onCloseModal} />
        </Box>
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form>
            {console.log(errors, "errors")}
            <DialogContent>
              <Box className={classes.labelInputContainer}>
                <Typography>
                  <span>*</span>Name:
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    name="name"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <FormHelperText error>
                    {touched.name && errors.name}
                  </FormHelperText>
                </FormControl>
              </Box>

              <Box className={classes.labelInputContainer}>
                <Typography>
                  <span>*</span>Email:
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <FormHelperText error>
                    {touched.email && errors.email}
                  </FormHelperText>
                </FormControl>
              </Box>

              <Box className={classes.labelInputContainer}>
                <Typography>
                  <span>*</span>Phone:
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="tel"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  <FormHelperText error>
                    {touched.phone && errors.phone}
                  </FormHelperText>
                </FormControl>
              </Box>

              <Box className={classes.labelInputContainer}>
                <Typography>
                  <span>*</span>Website:
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    name="website"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.website}
                  />
                  <FormHelperText error>
                    {touched.website && errors.website}
                  </FormHelperText>
                </FormControl>
              </Box>
            </DialogContent>

            <DialogActions>
              <Button
                color="primary"
                className={classes.cancelBtn}
                variant="outlined"
                onClick={onCloseModal}
              >
                Cancel
              </Button>
              <ContainedButton type="submit" disabled={isSubmitting}>
                OK
              </ContainedButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>,
    document.getElementById("portal-root")
  );
};

export default EditUser;
