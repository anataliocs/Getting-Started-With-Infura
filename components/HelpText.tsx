const HelpText = ({
  children,
  className,
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={`p-2 text-sm border rounded w-fit bg-white/5 opacity-60 border-white/40 ${className}`}
    >
      {children}
    </p>
  );
};

export default HelpText;
