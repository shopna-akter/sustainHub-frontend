import { Footer } from "@/components/shared/Footer";
import NavbarWrapper from "@/components/shared/NavbarWrapper";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <NavbarWrapper />
            {children}
            <Footer/>
        </div>
    );
};

export default CommonLayout;