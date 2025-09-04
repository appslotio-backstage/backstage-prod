import Why from "./components/Why";
import Hero from "./components/Hero.js";
import Portfolio from "./components/Portfolio.js";
import Services from "./components/Services.js";
import Styles from "./components/Styles.js";
import PricingSection from "./components/Pricing.jsx";
import BookingForm from "./components/BookingForm.jsx";
import BookingSection from "./components/BookingForm.jsx";
import PhotoSessionQuiz from "./components/BookingForm.jsx";
import Reviews from "./components/rewiews.jsx";
import Footer from "./components/footer.jsx";
function App() {
    return (
        <>

            <Hero />
            <Why />
            <Portfolio />
            <Services />
            <Styles />
            <PricingSection></PricingSection>
           <PhotoSessionQuiz></PhotoSessionQuiz>
           <Reviews></Reviews>
           <Footer></Footer>
        </>
    );
}

export default App;
