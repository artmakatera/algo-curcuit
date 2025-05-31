

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  viewBox?: string; // Made viewBox optional with a default value
  preserveAspectRatio?: string;
}

export const Svg: React.FC<SvgProps> = ({
  viewBox = '0 0 600 300', // Default viewBox value
  preserveAspectRatio = 'xMidYMid meet',
  children,
  ...props
}) => {


  
  return (
    <div className="w-full max-w-xl mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        preserveAspectRatio={preserveAspectRatio}
        width="100%"
        height="100%"
        {...props}
      >
        {children}
      </svg>
    </div>
  );
};