export function BackgroundDecoration() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="bg-primary/5 absolute top-0 -right-24 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-accent/5 absolute bottom-0 -left-24 h-96 w-96 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]" />
    </div>
  );
}
