// Maqueta de laptop + celular con capturas reales del proyecto.
type Props = { laptop: string; phone: string; alt: string };

export default function DeviceMockup({ laptop, phone, alt }: Props) {
  return (
    <div className="relative w-full pb-[6%] pr-[6%] select-none" aria-label={alt} role="img">
      {/* Laptop */}
      <div className="relative w-[90%] transition-transform duration-500 group-hover:-translate-y-1">
        <div className="rounded-t-[10px] bg-[#0b0d12] p-[2.2%] pb-[3%] border border-white/15 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.9)]">
          <span aria-hidden="true" className="block mx-auto mb-[1.2%] w-1 h-1 rounded-full bg-white/20" />
          <img src={laptop} alt="" loading="lazy" decoding="async" className="block w-full aspect-[16/10] object-cover object-top rounded-[3px]" />
        </div>
        <div aria-hidden="true" className="relative -mx-[6%] h-[10px] sm:h-[14px] rounded-b-[12px] bg-gradient-to-b from-[#3a3d46] via-[#23252c] to-[#121318] shadow-[0_12px_20px_-6px_rgba(0,0,0,0.8)]">
          <span className="absolute left-1/2 -translate-x-1/2 top-0 w-[16%] h-[40%] rounded-b-md bg-[#15161b]" />
        </div>
      </div>
      {/* Celular */}
      <div className="absolute right-0 bottom-0 w-[24%] transition-transform duration-500 group-hover:-translate-y-2">
        <div className="relative rounded-[18%/8.5%] bg-[#0b0d12] p-[4%] border border-white/20 shadow-[0_24px_40px_-14px_rgba(0,0,0,0.95)]">
          <span aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 top-[3.5%] w-[32%] h-[2.6%] rounded-full bg-black z-10" />
          <img src={phone} alt="" loading="lazy" decoding="async" className="block w-full aspect-[390/844] object-cover object-top rounded-[14%/6.5%]" />
        </div>
      </div>
    </div>
  );
}
