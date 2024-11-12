import banner from '@assets/banner_superwide.png';

function HeroBanner() {
  return (
    <aside className="flex jc-center">
      <img width="100%" src={banner} alt="" />
    </aside>
  );
}

export default HeroBanner;