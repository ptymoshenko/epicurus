import Image from "next/image";

export default function PhotoBreak() {
  return (
    <section className="relative w-full aspect-[375/565] md:aspect-[8/5] md:max-h-[900px] overflow-hidden">
      {/* Desktop: cover centered */}
      <Image
        src="/images/photo-break.png"
        alt=""
        fill
        className="hidden md:block object-cover object-center"
        sizes="100vw"
      />
      {/* Mobile: cover shifted right to focus on the subject */}
      <Image
        src="/images/photo-break.png"
        alt=""
        fill
        className="md:hidden object-cover object-[40%_center]"
        sizes="100vw"
      />
    </section>
  );
}
