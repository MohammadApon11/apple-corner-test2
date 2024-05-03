import Marquee from "react-fast-marquee";

const Marque = () => {
  return (
    <div className="flex items-center text-white w-[70%]">
      <Marquee
        className="lg:text-lg text-sm text-textHeader lg:font-normal font-semibold"
        speed={50}
      >
        Mohammad Foyez Ullah of Dhaka, Bangladesh is a man who is at the
        pinnacle of the architectural professionalism in his own country. His
        architecture is recognizable by virtue of his pure and austere qualities
        and notable for their dignity and restraints. Well over a quarter
        century into the profession, his style has largely been accepted as a
        philosophy that responds to the socio-economic and tropical context of
        Dhaka.
      </Marquee>
    </div>
  );
};

export default Marque;
