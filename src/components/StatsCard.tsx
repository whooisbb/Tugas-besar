type Props = {

  title: string;

  value: string;

  color: string;
};

export default function StatsCard({
  title,
  value,
  color,
}: Props) {

  return (

    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="text-gray-500">

        {title}

      </h2>

      <p
        className={`mt-3 text-4xl font-bold ${color}`}
      >

        {value}

      </p>

    </div>
  );
}