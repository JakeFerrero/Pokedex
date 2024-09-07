import style from './errorTriangle.module.css';

interface Props {
  size: 'small' | 'large';
  message: string;
}

export default function ErrorTriangle({ size, message }: Props) {
  return (
    <div className={style.errorTriangleContainer}>
      <i title='Error Triangle Icon' className={`bi bi-exclamation-triangle ${size === 'large' ? 'h1' : 'h3'} ${style.errorTriangle}`} />
      <p title='Error Text' style={{ fontSize: size === 'large' ? '1.5rem' : '1rem' }}>{message}</p>
    </div>
  );
}
