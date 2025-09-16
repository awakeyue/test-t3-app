export default function TodoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-7xl">{children}</div>
    </div>
  );
}
