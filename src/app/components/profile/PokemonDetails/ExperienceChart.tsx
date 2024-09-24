import { GROWTH_RATE_FUNCTION_MAP } from '@/app/utils/PokemonExperience';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import style from './pokemonDetails.module.css';

interface Props {
  typeColor: string;
  growthRate: string;
}

export default function ExperienceChart({ typeColor, growthRate }: Props) {
  const generateData = (growthRate: string) => {
    const calculateY = GROWTH_RATE_FUNCTION_MAP[growthRate];
    const data = [];
    for (let x = 0; x <= 100; x += 25) {
      data.push({
        x,
        y: Math.max(0, calculateY(x))
      });
    }
    return data;
  };

  const sanitizeExpNumber = (value: number): string => {
    const ONE_MILLION = 1000000;
    const ONE_THOUSAND = 1000;
    if (value >= ONE_MILLION) return `${value / 1000000}m`;
    else if (value >= ONE_THOUSAND) return `${value / 1000}k`;
    else return '' + value;
  };

  const data = generateData(growthRate);

  return (
    <div className={style.expChartContainer}>
      <b>Growth Rate:</b> {growthRate}
      <ResponsiveContainer  height={250}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" label={{ value: 'Level', position: 'insideBottom', offset: -10 }} />
          <YAxis
            label={{ value: 'Experience', angle: -90, position: 'insideLeft', offset: -5 }}
            tickFormatter={(value: number) => sanitizeExpNumber(value)}
          />
          <Tooltip formatter={(value: number) => sanitizeExpNumber(value)} />
          <Line type="monotone" dataKey="y" stroke={typeColor} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
