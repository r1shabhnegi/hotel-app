import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
// import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col min-h-dvh'>
      <Header />
      <Hero />
      {/* <div className=''>
        <SearchBar />
      </div> */}
      <div className='container flex-1 py-10 mx-auto'>{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
