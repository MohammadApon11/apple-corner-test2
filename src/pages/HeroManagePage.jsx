import HeroModal from "../components/modals/hero/HeroModal";
import Table from "../components/shared/Table";
import useGetHero from "../hooks/heroes/useGetHero";

const HeroManagePage = () => {
  const { heroes, herosLoading } = useGetHero();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="py-8 text-4xl text-white">All Hero Items</h3>
        <button
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="btn btn-outline btn-info"
        >
          Create New Hero
        </button>
      </div>
      <HeroModal />
      <Table data={heroes} loading={herosLoading} />
    </div>
  );
};

export default HeroManagePage;
