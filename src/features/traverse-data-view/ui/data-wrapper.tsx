interface DataWrapperProps {
  children: React.ReactNode;
  title: string;
}

export const DataWrapper = ({ children, title }: DataWrapperProps) => {
  return (
    <div className="mb-4">
      <h5 className="text-xs -mb-2" >{title}</h5>
      {children}
    </div>
  );
};
