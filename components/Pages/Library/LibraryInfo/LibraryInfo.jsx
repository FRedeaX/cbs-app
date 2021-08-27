// const FETCH_PAGE = gql`
//   query FetchPage($pathname: ID!) {
//     page(id: $pathname, idType: URI) {
//       id
//       title
//       excerpt
//       content
//       template {
//         ... on DefaultTemplate {
//           templateName
//         }
//         ... on Template {
//           templateName
//         }
//       }
//     }
//   }
// `;

// const LibraryInfo = ({ url }) => {
// const pathname = `/o-nas/${url}`;
// const { data, loading, error } = useQuery(FETCH_PAGE, {
//   variables: { pathname },
// });

// useEffect(() => {
//   if (!loading) document.body.style.minHeight = "";
// }, [loading]);

// const renderLibraryInfo = (page) => {
//   return (
//   );
// };

// if (loading) return 1;
// if (error) return console.error(error);

// return (
//   <>
{
  /* {console.log("LibraryInfo")} */
}
{
  /* <h3></h3>
      <div />
    </>
  );
}; */
}

// function mapStateToProps(state) {
//   return {
//     page: state.page.page,
//     loaded: state.page.loaded,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getPageBySlug: (type, url) => dispatch(getPageBySlug(type, url)),
//   };
// }

// export default LibraryInfo;
