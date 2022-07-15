import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TimeList from "../TimeList";
import moment from "moment";
import { dateWiseDataAlter } from "../../Utils/helpers/dataModification";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "!important #ffffff",
  },
  tabs: {
    background: "white",
    color: "#004FB4",
    width: "100%",
  },
  appBar: {
    width: "100%",
    borderBottom: `0.5px solid white`,
  },
}));

export default function ShiftsTab(props) {
  const { data, handleBook, handleCancel } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <Box sx={{ bgcolor: "background.paper", width: 500 }}>
        <AppBar position="static" elevation={0} className={classes.appBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            variant="scrollable"
            indicatorColor="#ffffff"
            scrollButtons={false}
            classes={{ root: classes.tabs }}
          >
            {data &&
              data.map((el, index) => {
                return (
                  <Tab
                    label={
                      <Typography sx={{ textTransform: "none" }}>
                        {`${el?.label} (${el?.content?.length || 0})`}
                      </Typography>
                    }
                    {...a11yProps(index)}
                  />
                );
              })}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {data &&
            data.map((el, index) => {
              return (
                <TabPanel value={value} index={index} dir={theme.direction}>
                  <TimeList
                    data={dateWiseDataAlter(el?.content)}
                    handleBook={handleBook}
                    handleCancel={handleCancel}
                  />
                </TabPanel>
              );
            })}
        </SwipeableViews>
      </Box>
    </div>
  );
}
