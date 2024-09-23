import { Cell, Legend, Pie, PieChart } from 'recharts';
import style from './pokemonDetails.module.css';

interface Props {
  genderRate: number;
}

const COLORS: Record<string, string> = {
  Male: 'blue',
  Female: 'hotpink',
  Genderless: 'grey'
};

export default function GenderChart({ genderRate }: Props) {
  const data =
    genderRate < 0
      ? [{ name: 'Genderless', value: 100 }]
      : [
          { name: 'Male', value: 100 - genderRate },
          { name: 'Female', value: genderRate }
        ];

  return (
    <div className={style.chartContainer}>
      <b>Gender Ratio:</b>
      <PieChart height={160} width={160}>
        <Pie data={data} innerRadius={25} outerRadius={45} paddingAngle={1} dataKey="value">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.name]}
              name={entry.name === 'Genderless' ? entry.name : `${entry.name}: ${entry.value}%`}
            />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}
