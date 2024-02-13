export default function ShopLayout({ children }) {
  return (
    <section className="space-x-3 py-6 w-full">
      <div className="flex flex-row justify-between gap-5 w-full md:px-10 absolute top-0 md:top-20 md:bottom-10 bottom-0 z-40 lg:z-10">
        {children}
      </div>
    </section>
  );
}
