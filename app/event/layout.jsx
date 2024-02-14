export default function ShopLayout({ children }) {
  return (
    <section className="flex flex-col items-center max-h-screen absolute top-8 left-0 right-0 bottom-0">
      {children}
      <video autoPlay muted loop className="videoTag -z-10">
        <source src="assets/sea.mov" type="video/mp4" />
      </video>
    </section>
  );
}
