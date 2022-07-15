import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TimeList from "../../Components/TimeList";
import { useShiftContext } from "../../Context/shifts";
import { getShifts } from "../../Utils/ApiService";
import { dateWiseDataAlter } from "../../Utils/helpers/dataModification";
import AvailableShifts from "../AvailableShifts";

export default function Homepage() {
  const {
    shiftState: { shifts },
    shiftDispatch,
  } = useShiftContext();
  const [availableShifts, setAvailableShifts] = useState([]);
  const [myShifts, setMyShifts] = useState([]);
  const [visible, setVisible] = useState("myShifts");

  const handleCancel = (id) => {
    const dataCopy = [...shifts];
    const newArr = dataCopy.map((el) => {
      if (el.id === id) {
        el.booked = false;
        return el;
      } else {
        return el;
      }
    });
    shiftDispatch({ type: "replace", payload: { shifts: [...newArr] } });
  };

  useEffect(() => {
    getShifts().then((res) => {
      shiftDispatch({ type: "update", payload: { shifts: [...res] } });
    });
  }, []);

  useEffect(() => {
    if (shifts.length > 0) {
      const availShifts = [];
      const myShiftsArr = [];
      shifts.forEach((shift) => {
        if (availShifts.some((el) => el.label === shift.area)) {
          const index = availShifts.findIndex((el) => el.label === shift.area);
          if (index > 0) {
            availShifts[index]?.content?.push(shift);
          }
        } else {
          availShifts.push({ label: shift?.area, content: [shift] });
        }
        if (shift.booked === true) {
          myShiftsArr.push(shift);
        }
      });
      console.log(myShiftsArr);
      setMyShifts([...myShiftsArr]);
      setAvailableShifts([...availShifts]);
    }
  }, [shifts]);

  return (
    <>
      <Grid container spacing={3} justifyContent="left" marginBottom={2}>
        <Grid item>
          <Typography
            onClick={() => {
              setVisible("myShifts");
            }}
            sx={
              visible === "myShifts"
                ? { color: "#004FB4" }
                : { color: "#CBD2E1" }
            }
          >
            My shifts
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={
              visible !== "myShifts"
                ? { color: "#004FB4" }
                : { color: "#CBD2E1" }
            }
            onClick={() => {
              setVisible("availableShifts");
            }}
          >
            Available shifts
          </Typography>
        </Grid>
      </Grid>
      {visible === "myShifts" ? (
        <Grid item>
          <TimeList
            data={dateWiseDataAlter(myShifts)}
            handleCancel={handleCancel}
            type={visible}
          />
        </Grid>
      ) : (
        <Grid item>
          <AvailableShifts availableShifts={availableShifts} />
        </Grid>
      )}
    </>
  );
}
