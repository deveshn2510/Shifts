import moment from "moment";

export const dateWiseDataAlter = (data) => {
  let dataCopy = [...data];
  const alteredData = [];
  dataCopy.forEach((el) => {
    if (
      alteredData.some(
        (elem) => elem.dateLabel === moment(el.startTime).format("MMMM D")
      )
    ) {
      const index = alteredData.findIndex(
        (elem) => elem.dateLabel === moment(el.startTime).format("MMMM D")
      );
      if (index > 0) {
        alteredData[index]?.timings?.push(el);
      }
    } else {
      alteredData.push({
        dateLabel: moment(el.startTime).format("MMMM D"),
        timings: [el],
      });
    }
  });
  return [...alteredData];
};
