import { FiArrowUpRight } from "react-icons/fi";

type BuiltCardProps = {
  title: string;
  image: string;
  link: string;
  description: string;
};

export default function BuiltCard({
  title,
  image,
  link,
  description,
}: BuiltCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group block w-full text-black"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          draggable="false"
          className="h-full w-full object-cover opacity-90 transition-opacity duration-300 ease-in group-hover:opacity-100"
        />
      </div>

      <div className="mt-4 border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl tracking-tight decoration-2 underline-offset-4 group-hover:underline">
            {title}
          </h2>

          <FiArrowUpRight className="h-5 w-5 shrink-0 opacity-25 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
        </div>

        <p className="mt-1.5 text-sm leading-relaxed text-gray-500 opacity-60 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          {description}
        </p>
      </div>
    </a>
  );
}
