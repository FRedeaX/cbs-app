import * as Sentry from "@sentry/nextjs";
import NextErrorComponent from "next/error";

const CustomErrorComponent = (props) => {
  // If you're using a Nextjs version prior to 12.2.1, uncomment this to
  // compensate for https://github.com/vercel/next.js/issues/8592
  Sentry.captureException(props);

  const { statusCode } = props;
  return <NextErrorComponent statusCode={statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData) => {
  Sentry.captureException(contextData);

  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;
