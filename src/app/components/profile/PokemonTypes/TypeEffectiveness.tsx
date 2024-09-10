import { TypeEffectivenessMap } from '@/app/utils/calculateTypeWeaknesses';
import TypeEffectivenessPill from './TypeEffectivenessPill';

interface Props {
  typeEffectivenessMap: TypeEffectivenessMap;
}

export default function TypeEffectiveness({ typeEffectivenessMap }: Props) {
  return (
    <div>
      <div style={{display: 'flex', textAlign: 'center'}}>
        <div>Damaged normally by: </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {typeEffectivenessMap[1].map((type) => {
            return <TypeEffectivenessPill type={type} />;
          })}
        </div>
      </div>
      <div>
        Weak to: {typeEffectivenessMap[2]}, {typeEffectivenessMap[4]}
      </div>
      <div>
        Resists: {typeEffectivenessMap[0.5]}, {typeEffectivenessMap[0.25]}
      </div>
      <div>Immune to: {typeEffectivenessMap[0]}</div>
    </div>
  );
}
