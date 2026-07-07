'use client';
import MathText from './MathText';

export default function SmartText({ text }: { text?: string }) {
  const safeText = text || "";
  const isMath = safeText.includes('$');
  
  // Ubah dari whitespace-pre-line menjadi whitespace-normal
  const style = "whitespace-normal break-words block"; 

  const imageRegex = /\[(.*?\.(?:png|jpg|jpeg|gif))\]/;
  const match = safeText.match(imageRegex);

  if (match) {
    const fileName = match[1];
    const textBefore = safeText.split(match[0])[0];
    const textAfter = safeText.split(match[0])[1];

    return (
      <div className={style}>
        {textBefore}
        <img 
          src={`/images/${fileName}`} 
          alt="Bagan" 
          className="my-4 rounded-lg shadow-md border max-w-full"
        />
        {textAfter}
      </div>
    );
  }

  if (isMath) {
    return <div className={style}><MathText text={safeText} /></div>;
  }
  
  // Menggunakan 'span' atau 'div' dengan style yang sudah diperbarui
  return <div className={style}>{safeText}</div>;
}