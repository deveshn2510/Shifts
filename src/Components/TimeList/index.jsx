import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  heading: {
    color: "#4F6C92",
    fontWeight: 600,
    fontSize: 16,
  },
}));

export default function TimeList(props) {
  const classes = useStyles();
  const { data, handleBook, handleCancel, type = "" } = props;

  const getDateLabel = (nonFormattedDate, formattedDate) => {
    let diff = moment(nonFormattedDate).diff(moment(), "days");
    switch (diff) {
      case 0:
        return "Today";

      case 1:
        return "Tomorrow";

      default:
        return formattedDate;
    }
  };

  return (
    <>
      {data.length > 0 ? (
        data?.map((el) => {
          return (
            <Grid container direction={"column"}>
              <Grid
                item
                sx={{ background: "#F1F4F8", border: "0.5px solid #CBD2E1" }}
              >
                <Typography
                  textAlign="left"
                  pt={1}
                  pb={1}
                  ml={1}
                  className={classes.heading}
                >
                  {getDateLabel(el?.timings[0]?.startTime, el.dateLabel)}{" "}
                  {type === "myShifts" && (
                    <span
                      style={{
                        color: "#CBD2E1",
                        fontSize: 12,
                        fontWeight: 400,
                      }}
                    >
                      {el?.timings?.length} shifts
                    </span>
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <>
                  {el.timings.map((timing) => {
                    return (
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ border: "0.5px solid #CBD2E1" }}
                      >
                        <Grid item>
                          <>
                            <Grid container direction="column">
                              <Grid item>
                                <Typography color={"#4F6C92"} pt={1} ml={1}>
                                  {moment(timing.startTime).format("HH:mm")} -{" "}
                                  {moment(timing.endTime).format("HH:mm")}
                                </Typography>
                              </Grid>
                              {type === "myShifts" && (
                                <Grid item textAlign={"left"}>
                                  <Typography
                                    color={"#CBD2E1"}
                                    fontSize={12}
                                    pb={1}
                                    ml={1}
                                  >
                                    {timing.area}
                                  </Typography>
                                </Grid>
                              )}
                            </Grid>
                          </>
                        </Grid>
                        <Grid item pt={1} pb={1} mr={1}>
                          <div>
                            {timing.booked ? (
                              <Button
                                sx={{
                                  borderColor: "#FE93B3",
                                  color: "#E2006A",
                                  borderRadius: 32,
                                }}
                                variant="outlined"
                                onClick={() => {
                                  handleCancel(timing.id);
                                }}
                                disabled={moment().isBetween(
                                  timing.startTime,
                                  timing.endTime
                                )}
                              >
                                Cancel
                              </Button>
                            ) : (
                              <Button
                                sx={{
                                  color: "#16A64D",
                                  borderColor: "#55CB82",
                                  borderRadius: 32,
                                }}
                                variant="outlined"
                                onClick={() => {
                                  handleBook(timing.id);
                                }}
                              >
                                Book
                              </Button>
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    );
                  })}
                </>
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Typography>No Data Found</Typography>
      )}
    </>
  );
}
