export default function TodoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-2">
      <div className="w-full max-w-7xl">{children}</div>
    </div>
  )
}
