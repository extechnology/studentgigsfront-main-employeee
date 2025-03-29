import Header from "@/Components/Common/Header";
import Footer from "@/Components/Common/Footer";
import WhatsAppButton from "@/Components/Common/WhatsappIcon";
import { Outlet } from "react-router-dom";

export default function Layout() {

    return (

        <main className="w-full min-h-screen flex flex-col relative">

            {/* Header */}
            <header aria-label="Main Navigation">
                <Header />
            </header>

            {/* Main Content */}
            <section className="flex-grow">
                <Outlet />
            </section>

            {/* Footer */}
            <footer aria-label="Footer">
                <Footer />
            </footer>

            {/*  WhatsApp Icon */}
            <WhatsAppButton />

        </main>

    );

}
