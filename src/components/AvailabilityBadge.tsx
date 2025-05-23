import { useEffect, useState } from "react";

const AvailabilityBadge = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 50)
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)
    })

    return (
        <div
            className={`fixed top-4 right-4 lg:block hidden bg-[#e4c19a] text-black text-sm px-4 py-2 rounded-xl shadow-lg transition-opacity duration-300 ${
                show ? "opacity-100" : "opacity-0"
            }`}
            >
            24/7, 12am–9pm | +234 9047648379
        </div>
    );
};

export default AvailabilityBadge;