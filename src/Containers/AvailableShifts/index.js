import { Box } from "@mui/material";
import React from "react";
import ShiftsTab from "../../Components/Tabs";
import { useShiftContext } from "../../Context/shifts";
import { postBookShifts } from "../../Utils/ApiService";

export default function AvailableShifts(props) {
  const {
    shiftState: { shifts },
    shiftDispatch,
  } = useShiftContext();
  const { availableShifts } = props;
  const handleBook = (id) => {
    const dataCopy = [...shifts];
    const newArr = dataCopy.map((el) => {
      if (el.id === id) {
        el.booked = true;
        return el;
      } else {
        return el;
      }
    });
    shiftDispatch({ type: "replace", payload: { shifts: [...newArr] } });
  };

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

  return (
    <Box sx={{ border: "0.5px solid #CBD2E1" }}>
      <ShiftsTab
        data={availableShifts}
        handleBook={handleBook}
        handleCancel={handleCancel}
      />
    </Box>
  );
}
