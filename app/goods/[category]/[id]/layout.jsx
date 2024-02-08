export default function ShopLayout({ children }) {
  return (
    <section className="space-x-3 py-6 w-full">
      <div className="flex flex-row justify-between w-full md:pr-10 absolute top-0 md:top-20 md:bottom-10 bottom-0 z-10">
        {children}
      </div>
    </section>
  );
}
