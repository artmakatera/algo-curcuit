


type VisualArrayWrapperProps = {
  children: React.ReactNode;
};

export const VisualArrayWrapper = ({ children}: VisualArrayWrapperProps) => {
  return (
    <div className="flex items-center my-12 ">
      {children}
    </div>
  );
}