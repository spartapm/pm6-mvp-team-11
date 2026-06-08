type MobileShellProps = {
  children: React.ReactNode;
};

export default function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-dvh bg-[#8f8f90]">
      <div className="mx-auto flex min-h-dvh w-full max-w-[402px] flex-col bg-white shadow-lg">
        {children}
      </div>
    </div>
  );
}
