import Image from "next/image";

const services = [
  {
    number: "[ 1 ]",
    name: "Brand Discovery",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/images/service-brand-discovery.png",
    imageAlt: "Brand Discovery",
  },
  {
    number: "[ 2 ]",
    name: "Web Design & Dev",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/images/service-web-design.png",
    imageAlt: "Web Design & Dev",
  },
  {
    number: "[ 3 ]",
    name: "Marketing",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/images/service-marketing.png",
    imageAlt: "Marketing",
  },
  {
    number: "[ 4 ]",
    name: "Photography",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/images/service-photography.png",
    imageAlt: "Photography",
  },
];

export default function Services() {
  return (
    <section data-nav-theme="dark" className="bg-black px-4 py-12 md:px-8 md:py-20">
      {/* [ SERVICES ] label */}
      <p
        className="text-[14px] uppercase leading-[1.1] text-white mb-12 md:mb-12"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        [ services ]
      </p>

      {/* [4]  DELIVERABLES */}
      <div
        className="flex justify-between items-center w-full mb-12 md:mb-12 font-light uppercase text-white leading-none tracking-[-0.08em] text-[32px] md:text-[96px]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <span>[4]</span>
        <span>Deliverables</span>
      </div>

      {/* Service list */}
      <div className="flex flex-col gap-12">
        {services.map((service) => (
          <div key={service.number} className="flex flex-col gap-[9px]">
            {/* Number + divider */}
            <p
              className="text-[14px] uppercase leading-[1.1] text-white"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {service.number}
            </p>
            <div className="w-full h-px bg-white" />

            {/* Item body — desktop: row; mobile: column */}
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start md:gap-6 mt-1">
              {/* Service name */}
              <p
                className="font-bold italic md:font-light uppercase text-white text-[36px] leading-[1.1] tracking-[-0.04em] whitespace-nowrap"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {service.name}
              </p>

              {/* Description + image — desktop: row; mobile: column */}
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                <p
                  className="text-[14px] leading-[1.3] tracking-[-0.04em] text-white md:w-[393px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {service.description}
                </p>

                {/* Image */}
                <div className="relative w-full aspect-square md:w-[151px] md:h-[151px] md:aspect-auto shrink-0">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 151px"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
