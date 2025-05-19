import { CircularProgress } from "@mui/material";

function GradientCircular(props) {
  return (
    <>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4B51F4" />
            <stop offset="100%" stopColor="#FF6262" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        {...props}
        sx={{
          ...props.sx,
          "svg circle": { stroke: "url(#my_gradient)" },
        }}
      />
    </>
  );
}

export default GradientCircular;
