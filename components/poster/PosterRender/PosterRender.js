// import React from "react";
// import PosterItem from "../PosterItem/PosterItem";

// const PosterRender = ({
//   posters,
//   isSkipPastEvent,
//   limitRender,
//   hours,
//   day,
//   month,
//   cls,
// }) => {
//   let index = 0;
//   return posters.map((poster) => {
//     const posterDate = poster.posterDate.date;
//     const posterDay = posterDate.split("/")[0] * 1;
//     const posterMonth = posterDate.split("/")[1] * 1;
//     if (
//       isSkipPastEvent &&
//       posterMonth === month &&
//       ((limitRender && index + 1 > limitRender) ||
//         posterDay < day ||
//         (posterDay === day && hours > 18))
//     )
//       return null;
//     index++;
//     return <PosterItem key={poster.id} data={poster} cls={cls} />;
//   });
// };

// export default PosterRender;

// <PosterRender
//   posters={posters}
//   isSkipPastEvent={isSkipPastEvent}
//   limitRender={limitRender}
//   hours={hours}
//   day={day}
//   month={month}
//   cls={clsItem}
// />;
