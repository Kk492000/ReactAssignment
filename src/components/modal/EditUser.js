import React from "react";
import { createPortal } from "react-dom";
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
import { CloseOutlined } from "@ant-design/icons";
import { Formik, Form } from "formik";
import ContainedButton from "../ui/ContainedButton";
import * as Yup from "yup";
import { Colors } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { editUser } from "../../store/userSlice";

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
      padding: "7.5px",
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
  name: Yup.string().required("This is a required field."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("This is a required field."),
  phone: Yup.string().required("This is a required field."),
  website: Yup.string().required("This is a required field."),
});

const EditUser = ({ openModal, onCloseModal, user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    website: user?.website ?? "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(editUser({ ...user, ...values }));
    onCloseModal();
    setSubmitting(false);
  };

  if (!openModal) return null;

  return createPortal(
    <Dialog
      TransitionComponent={Zoom}
      keepMounted
      onClose={onCloseModal}
      className={classes.dialogContainer}
      maxWidth="sm"
      open={openModal}
    >
      <DialogTitle>
        <Box className={classes.dialogHeadContainer}>
          <Typography>Basic Modal</Typography>
          <CloseOutlined style={{ fontSize: "15px" }} onClick={onCloseModal} />
        </Box>
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
            <DialogContent>
              {[
                { name: "name", label: "Name", maxLength: 50 },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                },
                { name: "phone", label: "Phone", type: "tel", maxLength: 20 },
                { name: "website", label: "Website" },
              ].map((field) => (
                <Box key={field.name} className={classes.labelInputContainer}>
                  <Typography>
                    <span>*</span>
                    {field.label}:
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      type={field.type || "text"}
                      name={field.name}
                      fullWidth
                      variant="outlined"
                      inputProps={{ maxLength: field.maxLength || 255 }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[field.name]}
                    />
                    <FormHelperText error>
                      {errors[field.name] && errors[field.name]}
                    </FormHelperText>
                  </FormControl>
                </Box>
              ))}
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
                {isSubmitting ? "Submitting" : "OK"}
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
