export default function PageWrapper({ children, background }) {
  return (
    <div className={`min-h-screen flex flex-col ${background}`}>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
