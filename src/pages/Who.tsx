export default function Who() {
  return (
    <section className="w-full max-w-xl px-6 text-black">
      <div className="h-32 w-32 mb-5 overflow-hidden rounded-full shadow-xl">
        <img
          src="./profile2025.jpg"
          alt="Jack Rose"
          draggable="false"
          className="h-full w-full scale-200 translate-y-10 object-cover drag-none"
        />
      </div>
      <div className="flex flex-col justify-end">
        <p className="mb-3 text-sm uppercase tracking-widest text-gray-400 alliance2">
          01 / About Me
        </p>
        <h2 className="mb-6 text-4xl font-semibold">I'm a huge nerd.</h2>
      </div>
      <p className="text-lg leading-relaxed text-gray-600">
        I have a B.S. in Data Analytics (computational specialization) from The
        Ohio State University with a minor in Philosophy. In my free time I
        enjoy watching anime (Hell's Paradise), working out, and collecting
        regional teas. My focus is in bridging AI/ML techniques with HPC.
      </p>
      <div className="mt-8 border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-400">
          Scroll through the questions to learn more.
        </p>
      </div>
    </section>
  );
}
