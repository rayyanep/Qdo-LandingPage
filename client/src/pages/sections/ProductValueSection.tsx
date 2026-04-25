import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const chains = [
  {
    name: "Ethereum",
    alt: "Eth ethereum",
    src: "/figmaAssets/eth--ethereum-.svg",
    imageClassName: "h-[38px] w-[38px]",
    textClassName:
      "w-fit [font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal leading-[normal] tracking-[0] text-[#00000099]",
  },
  {
    name: "BNB Smart Chain",
    alt: "Image",
    src: "/figmaAssets/image-1.png",
    imageClassName: "h-[38px] w-[38px]",
    textClassName:
      "w-fit [font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal leading-[normal] tracking-[0] text-[#00000099]",
  },
  {
    name: "Polygon",
    alt: "Image",
    src: "/figmaAssets/image-2-1.png",
    imageClassName: "h-[38px] w-[38px] object-cover",
    textClassName:
      "w-fit [font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal leading-[normal] tracking-[0] text-[#00000099]",
  },
];

export const ProductValueSection = (): JSX.Element => {
  return (
    <section className="w-full px-4 py-[18px] sm:px-8 md:px-12 lg:px-24 xl:px-40 xl:py-[54px]">
      <Card className="border-0 bg-transparent shadow-none">
        <CardContent className="p-0">
          <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:gap-[59px]">
            <ul
              className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:flex-nowrap sm:gap-7 sm:whitespace-nowrap"
              aria-label="Supported blockchains"
            >
              {chains.map((chain) => (
                <li key={chain.name} className="flex items-center gap-4">
                  <img
                    className={chain.imageClassName}
                    alt={chain.alt}
                    src={chain.src}
                  />
                  <span className={chain.textClassName}>{chain.name}</span>
                </li>
              ))}
            </ul>
            <Separator
              orientation="vertical"
              className="hidden h-[54px] w-px shrink-0 bg-[#659acd] md:block"
            />
            <Separator
              orientation="horizontal"
              className="block h-px w-full bg-[#659acd] md:hidden"
            />
            <div className="flex flex-col items-start gap-0.5">
              <h2 className="self-stretch [font-family:'Poppins_Latin-SemiBold',Helvetica] text-base font-semibold leading-[normal] tracking-[0] text-[#1a3d6c]">
                Smart defaults:
              </h2>
              <ul className="mt-1 flex w-full flex-col gap-1 self-stretch [font-family:'Poppins_Latin-Regular',Helvetica] text-sm font-normal leading-[1.5] tracking-[0] text-[#00000099] sm:text-base">
                <li>
                  <span className="font-semibold text-[#1a3d6c]">Polygon</span>{" "}
                  for everyday use
                </li>
                <li>
                  <span className="font-semibold text-[#1a3d6c]">BSC</span> for
                  MENA/Asia
                </li>
                <li>
                  <span className="font-semibold text-[#1a3d6c]">ETH</span> for
                  high value
                </li>
                <li>More chains are added in upcoming phases</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
