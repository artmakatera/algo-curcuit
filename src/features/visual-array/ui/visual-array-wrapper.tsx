


type VisualArrayWrapperProps = {
  children: React.ReactNode;
};

export const VisualArrayWrapper = ({ children }: VisualArrayWrapperProps) => {
  return (
    <div className="flex items-center mt-12 flex-wrap gap-y-8">
      {children}
    </div>
  );
}