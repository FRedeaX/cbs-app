const GetGlyph = ({ glyph, className }) => {
  switch (glyph) {
    case "download":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
          className={className}>
          <g clipPath="url(#clip0)">
            <path d="M20.577 12.196a.459.459 0 00-.423-.283h-5.021V.458A.458.458 0 0014.675 0H7.344a.458.458 0 00-.458.458v11.455h-5.04a.46.46 0 00-.424.282.459.459 0 00.1.5l9.14 9.17a.458.458 0 00.649.001l9.167-9.17a.457.457 0 00.1-.5z" />
          </g>
          <defs>
            <clipPath id="clip0">
              <path fill="#fff" d="M0 0h22v22H0z" />
            </clipPath>
          </defs>
        </svg>
      );
    default:
      return null;
  }
};

export default GetGlyph;
